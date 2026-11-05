-- MeSientoChill · migración 002: eventos y audios de pago (pago único con Stripe Checkout)
-- Ejecútala una vez en el editor SQL de Supabase, después de 001_stripe.sql. Se puede repetir sin problemas.

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
