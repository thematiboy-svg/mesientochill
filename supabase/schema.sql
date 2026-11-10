-- MeSientoChill · esquema de base de datos (Supabase / Postgres)
-- Ejecuta este archivo en el editor SQL de tu proyecto Supabase.

create extension if not exists pgcrypto;

-- Perfiles de usuario (uno por cuenta de auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null default '',
  apellidos text not null default '',
  telefono text,
  plan text not null default 'directo' check (plan in ('videos','directo')),
  suscrita_desde date not null default current_date,
  nivel text check (nivel in ('nunca','algo','regular')),
  molestias text[] not null default '{}',
  notas_salud text,
  consentimiento_salud boolean not null default false,
  objetivos text[] not null default '{}',
  franjas text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- Clases en directo programadas (20 min, máximo 10 personas)
create table if not exists public.class_sessions (
  id uuid primary key default gen_random_uuid(),
  disciplina text not null check (disciplina in ('Pilates','Total Barre','Mindfulness')),
  starts_at timestamptz not null,
  capacidad int not null default 10,
  cancelada boolean not null default false,
  unique (disciplina, starts_at)
);

-- Reservas y lista de espera
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid not null references public.class_sessions(id) on delete cascade,
  estado text not null check (estado in ('reservada','lista_espera','cancelada','cancelada_tarde','cancelada_monica','asistio','no_asistio')),
  created_at timestamptz not null default now(),
  unique (user_id, session_id)
);

-- Vídeos de la biblioteca
create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  disciplina text not null,
  nivel text,
  minutos int not null default 45,
  zona text,
  url text
);

-- Seguridad por filas
alter table public.profiles enable row level security;
alter table public.class_sessions enable row level security;
alter table public.reservations enable row level security;
alter table public.videos enable row level security;

create policy "perfil propio: leer" on public.profiles for select using (auth.uid() = id);
create policy "perfil propio: insertar" on public.profiles for insert with check (auth.uid() = id);
create policy "perfil propio: actualizar" on public.profiles for update using (auth.uid() = id);
create policy "clases: leer (autenticadas)" on public.class_sessions for select to authenticated using (true);
create policy "reservas propias: leer" on public.reservations for select using (auth.uid() = user_id);
create policy "vídeos: leer (autenticadas)" on public.videos for select to authenticated using (true);

-- Crear el perfil automáticamente al registrarse (usa los metadatos del formulario)
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, nombre, apellidos, telefono, plan)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nombre', ''),
    coalesce(new.raw_user_meta_data->>'apellidos', ''),
    new.raw_user_meta_data->>'telefono',
    coalesce(nullif(new.raw_user_meta_data->>'plan', ''), 'directo')
  );
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Créditos del mes: 8 al mes; cuentan las reservas activas, las asistidas y las no asistidas (perdidas)
create or replace function public.creditos_mes(p_user uuid, p_ref timestamptz default now())
returns table (disponibles int, usados int, perdidos int, caducan date)
language sql stable security definer set search_path = public as $$
  with r as (
    select re.estado
    from reservations re join class_sessions s on s.id = re.session_id
    where re.user_id = p_user
      and date_trunc('month', s.starts_at at time zone 'Europe/Madrid') = date_trunc('month', p_ref at time zone 'Europe/Madrid')
  )
  select
    greatest(8 - (select count(*) from r where estado in ('reservada','asistio','no_asistio','cancelada_tarde'))::int, 0),
    (select count(*) from r where estado in ('reservada','asistio'))::int,
    (select count(*) from r where estado in ('no_asistio','cancelada_tarde'))::int,
    (date_trunc('month', p_ref at time zone 'Europe/Madrid') + interval '1 month - 1 day')::date
$$;

-- Reservar una clase: plan Directo y vídeos, créditos, una clase al día, plazas libres
create or replace function public.reservar_clase(p_session uuid) returns text
language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  s class_sessions%rowtype;
  p profiles%rowtype;
  ocupadas int;
  libres_credito int;
  existente reservations%rowtype;
begin
  if uid is null then return 'No has iniciado sesión.'; end if;
  select * into p from profiles where id = uid;
  if p.plan <> 'directo' then return 'Tu plan Solo vídeos no incluye clases en directo.'; end if;
  select * into s from class_sessions where id = p_session and not cancelada;
  if not found then return 'Esa clase no está disponible.'; end if;
  if s.starts_at <= now() then return 'Esa clase ya ha empezado.'; end if;
  select * into existente from reservations where user_id = uid and session_id = p_session;
  if found and existente.estado = 'reservada' then return 'Ya tienes esta clase reservada.'; end if;
  if exists (
    select 1 from reservations re join class_sessions s2 on s2.id = re.session_id
    where re.user_id = uid and re.estado = 'reservada'
      and (s2.starts_at at time zone 'Europe/Madrid')::date = (s.starts_at at time zone 'Europe/Madrid')::date
      and s2.id <> p_session
  ) then return 'Solo puedes reservar una clase al día.'; end if;
  select disponibles into libres_credito from creditos_mes(uid, s.starts_at);
  if libres_credito <= 0 then return 'No te quedan créditos este mes.'; end if;
  select count(*) into ocupadas from reservations where session_id = p_session and estado = 'reservada';
  if ocupadas >= s.capacidad then return 'La clase está completa. Puedes apuntarte a la lista de espera.'; end if;
  insert into reservations (user_id, session_id, estado) values (uid, p_session, 'reservada')
  on conflict (user_id, session_id) do update set estado = 'reservada';
  return 'ok';
end $$;

-- Lista de espera
create or replace function public.unirse_lista(p_session uuid) returns text
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid();
begin
  if uid is null then return 'No has iniciado sesión.'; end if;
  insert into reservations (user_id, session_id, estado) values (uid, p_session, 'lista_espera')
  on conflict (user_id, session_id) do update set estado = 'lista_espera'
  where reservations.estado in ('cancelada');
  return 'ok';
end $$;

-- Cancelar reserva (hasta 24 h antes se devuelve el crédito) o salir de la lista
create or replace function public.cancelar_reserva(p_reserva uuid) returns text
language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  r reservations%rowtype;
  s class_sessions%rowtype;
begin
  select * into r from reservations where id = p_reserva and user_id = uid;
  if not found then return 'Reserva no encontrada.'; end if;
  select * into s from class_sessions where id = r.session_id;
  if r.estado = 'lista_espera' then
    delete from reservations where id = r.id;
    return 'ok';
  end if;
  if r.estado <> 'reservada' then return 'Esta reserva no se puede cancelar.'; end if;
  if s.starts_at <= now() then return 'La clase ya ha empezado.'; end if;
  if s.starts_at - now() < interval '24 hours' then
    -- Menos de 24 horas: se puede cancelar, pero se pierde el crédito de esta clase
    update reservations set estado = 'cancelada_tarde' where id = r.id;
    return 'tarde';
  end if;
  update reservations set estado = 'cancelada' where id = r.id;
  return 'ok';
end $$;

grant execute on function public.creditos_mes(uuid, timestamptz) to authenticated;
grant execute on function public.reservar_clase(uuid) to authenticated;
grant execute on function public.unirse_lista(uuid) to authenticated;
grant execute on function public.cancelar_reserva(uuid) to authenticated;

-- Plazas ocupadas por clase (visible para cualquier usuaria autenticada, sin datos personales)
create or replace function public.ocupacion(p_ids uuid[])
returns table (session_id uuid, ocupadas int)
language sql stable security definer set search_path = public as $$
  select session_id, count(*)::int from reservations
  where session_id = any(p_ids) and estado = 'reservada'
  group by session_id
$$;
grant execute on function public.ocupacion(uuid[]) to authenticated;

-- Enlaces de Zoom de cada clase (los crea el servidor con la API de Zoom al primer reservar)
create table if not exists public.class_zoom (
  session_id uuid primary key references public.class_sessions(id) on delete cascade,
  meeting_id text not null,
  join_url text not null,
  created_at timestamptz not null default now()
);
alter table public.class_zoom enable row level security;
-- Solo quien tiene plaza reservada ve el enlace; solo el servidor (clave de servicio) lo escribe
drop policy if exists "zoom: leer con reserva" on public.class_zoom;
create policy "zoom: leer con reserva" on public.class_zoom for select to authenticated
  using (exists (select 1 from public.reservations r where r.session_id = class_zoom.session_id and r.user_id = auth.uid() and r.estado = 'reservada'));

-- Cancelación por parte de Mónica: al marcar cancelada = true en una clase,
-- las reservas pasan a 'cancelada_monica' (devuelven el crédito) y se avisa a la web,
-- que envía los emails, vacía la lista de espera y borra la reunión de Zoom (una sola vez: avisada_at).
create extension if not exists pg_net with schema extensions;
alter table public.class_sessions add column if not exists avisada_at timestamptz;
create or replace function public.al_cancelar_clase() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.cancelada and not old.cancelada then
    update reservations set estado = 'cancelada_monica' where session_id = new.id and estado = 'reservada';
    perform net.http_post(
      url := 'https://www.mesientochill.com/api/clases/cancelada',
      body := jsonb_build_object('session_id', new.id),
      headers := '{"Content-Type":"application/json"}'::jsonb
    );
  end if;
  return new;
end $$;
drop trigger if exists on_class_cancelada on public.class_sessions;
create trigger on_class_cancelada after update of cancelada on public.class_sessions
  for each row execute function public.al_cancelar_clase();
