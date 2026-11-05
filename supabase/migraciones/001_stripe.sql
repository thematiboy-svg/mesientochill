-- MeSientoChill · migración 001: suscripciones con Stripe
-- Para bases de datos creadas con una versión anterior de schema.sql.
-- Ejecútala una vez en el editor SQL de Supabase. Se puede repetir sin problemas.

alter table public.profiles
  add column if not exists stripe_customer_id text unique,
  add column if not exists stripe_subscription_id text unique,
  add column if not exists estado_suscripcion text,
  add column if not exists periodo_fin timestamptz,
  add column if not exists cancela_al_final boolean not null default false;

-- Cada usuaria solo puede editar sus datos personales; el plan y la facturación los escribe el servidor.
revoke insert, update on public.profiles from anon, authenticated;
grant update (nombre, apellidos, telefono, nivel, molestias, notas_salud, consentimiento_salud, objetivos, franjas)
  on public.profiles to authenticated;

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
