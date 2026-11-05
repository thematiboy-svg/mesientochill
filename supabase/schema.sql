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
  -- Facturación (Stripe). Solo las escribe el servidor con la clave service_role.
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  estado_suscripcion text,          -- estado de Stripe: active, trialing, past_due, canceled, incomplete…
  periodo_fin timestamptz,          -- fin del periodo pagado (próximo cobro)
  cancela_al_final boolean not null default false,
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

-- Cada usuaria solo puede editar sus datos personales; el plan y la facturación los escribe el servidor
-- (webhook de Stripe con service_role). El perfil lo crea el trigger handle_new_user.
revoke insert, update on public.profiles from anon, authenticated;
grant update (nombre, apellidos, telefono, nivel, molestias, notas_salud, consentimiento_salud, objetivos, franjas)
  on public.profiles to authenticated;

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
  if coalesce(p.estado_suscripcion, '') not in ('active','trialing','past_due') then
    return 'Necesitas una suscripción activa para reservar clases.';
  end if;
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

-- ========== Eventos y audios de pago (igual que migraciones/002_compras.sql) ==========
-- Eventos de la comunidad (presenciales, con aforo)
create table if not exists public.eventos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text not null default '',
  lugar text not null default '',
  starts_at timestamptz not null,
  aforo int not null check (aforo > 0),
  precio_cents int not null default 3800 check (precio_cents > 0),  -- precio sin suscripción; el descuento se aplica en el servidor
  publicado boolean not null default true,
  created_at timestamptz not null default now()
);

-- Audios de Mindfulness descargables. `archivo` es la ruta dentro del espacio privado «audios» de Supabase Storage.
create table if not exists public.audios (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text not null default '',
  minutos int,
  archivo text not null,
  publicado boolean not null default true,
  created_at timestamptz not null default now()
);

-- Compras de pago único. Solo las escribe el servidor (service_role).
--   pendiente   la usuaria está en la página de pago; guarda la plaza hasta `caduca_at`
--   procesando  pago completado pero aún sin confirmar por el banco (p. ej. adeudo SEPA); la plaza sigue guardada
--   pagada      cobrada
--   reembolsada devuelta desde Stripe; la plaza queda libre
create table if not exists public.compras (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  evento_id uuid references public.eventos(id) on delete restrict,
  audio_id uuid references public.audios(id) on delete restrict,
  importe_cents int not null,
  estado text not null check (estado in ('pendiente','procesando','pagada','reembolsada')),
  caduca_at timestamptz,
  stripe_session_id text unique,
  stripe_payment_intent text,
  pagada_at timestamptz,
  created_at timestamptz not null default now(),
  check ((evento_id is null) <> (audio_id is null))
);
create unique index if not exists compras_evento_unica on public.compras (user_id, evento_id)
  where evento_id is not null and estado in ('pendiente','procesando','pagada');
create unique index if not exists compras_audio_unica on public.compras (user_id, audio_id)
  where audio_id is not null and estado in ('pendiente','procesando','pagada');
create index if not exists compras_pi on public.compras (stripe_payment_intent);

alter table public.eventos enable row level security;
alter table public.audios enable row level security;
alter table public.compras enable row level security;

drop policy if exists "eventos: leer publicados" on public.eventos;
create policy "eventos: leer publicados" on public.eventos for select using (publicado);
drop policy if exists "audios: leer publicados" on public.audios;
create policy "audios: leer publicados" on public.audios for select to authenticated using (publicado);
drop policy if exists "compras propias: leer" on public.compras;
create policy "compras propias: leer" on public.compras for select using (auth.uid() = user_id);
revoke insert, update, delete on public.compras from anon, authenticated;

-- Plazas ocupadas por evento: pagadas, en proceso y pagos en curso que no han caducado
create or replace function public.plazas_evento(p_ids uuid[])
returns table (evento_id uuid, ocupadas int)
language sql stable security definer set search_path = public as $$
  select c.evento_id, count(*)::int
  from compras c
  where c.evento_id = any(p_ids)
    and (c.estado in ('procesando','pagada') or (c.estado = 'pendiente' and c.caduca_at > now()))
  group by c.evento_id
$$;

-- Aparta una compra antes de abrir el pago. Solo la llama el servidor.
-- Devuelve la compra nueva, o la que ya estaba en curso (con su sesión de Stripe), o un mensaje de error.
create or replace function public.apartar_compra(p_user uuid, p_evento uuid, p_audio uuid, p_importe int, p_minutos int default 31)
returns table (compra_id uuid, sesion text, error text)
language plpgsql security definer set search_path = public as $$
declare
  e eventos%rowtype;
  previa compras%rowtype;
  ocupadas int;
  nueva uuid;
begin
  if (p_evento is null) = (p_audio is null) then
    return query select null::uuid, null::text, 'Compra no válida.'::text; return;
  end if;

  if p_evento is not null then
    -- Bloquea el evento: dos compras a la vez no pueden llevarse la última plaza.
    select * into e from eventos where id = p_evento and publicado for update;
    if not found then return query select null::uuid, null::text, 'Ese evento no está disponible.'::text; return; end if;
    if e.starts_at <= now() then return query select null::uuid, null::text, 'Ese evento ya ha empezado.'::text; return; end if;
  elsif not exists (select 1 from audios where id = p_audio and publicado) then
    return query select null::uuid, null::text, 'Ese audio no está disponible.'::text; return;
  end if;

  -- Libera pagos abandonados de esta misma usuaria
  delete from compras
  where user_id = p_user and estado = 'pendiente' and caduca_at <= now()
    and (evento_id = p_evento or audio_id = p_audio);

  select * into previa from compras
  where user_id = p_user and estado in ('pendiente','procesando','pagada')
    and (evento_id = p_evento or audio_id = p_audio)
  limit 1;
  if found then
    if previa.estado = 'pagada' then
      return query select null::uuid, null::text, (case when p_evento is not null then 'Ya tienes plaza en este evento.' else 'Ya tienes este audio.' end)::text; return;
    elsif previa.estado = 'procesando' then
      return query select null::uuid, null::text, 'Tu pago se está procesando. Te avisaremos cuando se confirme.'::text; return;
    end if;
    return query select previa.id, previa.stripe_session_id, null::text; return;
  end if;

  if p_evento is not null then
    select coalesce(sum(p.ocupadas), 0) into ocupadas from plazas_evento(array[p_evento]) p;
    if ocupadas >= e.aforo then return query select null::uuid, null::text, 'No quedan plazas para este evento.'::text; return; end if;
  end if;

  insert into compras (user_id, evento_id, audio_id, importe_cents, estado, caduca_at)
  values (p_user, p_evento, p_audio, p_importe, 'pendiente', now() + make_interval(mins => p_minutos))
  returning id into nueva;
  return query select nueva, null::text, null::text;
end $$;

revoke execute on function public.apartar_compra(uuid, uuid, uuid, int, int) from public, anon, authenticated;
grant execute on function public.plazas_evento(uuid[]) to anon, authenticated;

-- Espacio privado para los archivos de audio (las descargas usan enlaces temporales firmados)
insert into storage.buckets (id, name, public) values ('audios', 'audios', false)
on conflict (id) do nothing;
