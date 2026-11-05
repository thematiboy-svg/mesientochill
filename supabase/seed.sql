-- Datos de ejemplo: clases de lunes a viernes durante las próximas 6 semanas
-- (11:00 hora del café, 14:00 hora de la comida, 19:00 después del trabajo)
insert into public.class_sessions (disciplina, starts_at)
select
  (array['Pilates','Total Barre','Mindfulness'])[((extract(dow from d)::int + h.idx) % 3) + 1],
  ((d::timestamp + h.hora) at time zone 'Europe/Madrid')
from generate_series(current_date, current_date + 42, interval '1 day') as d
cross join (values (0, time '11:00'), (1, time '14:00'), (2, time '19:00')) as h(idx, hora)
where extract(dow from d) between 1 and 5
on conflict do nothing;

insert into public.videos (titulo, disciplina, nivel, minutos, zona) values
  ('Pilates día 1','Pilates','Nivel 1',45,'Cuerpo completo'),
  ('Pilates día 2','Pilates','Nivel 1',45,'Espalda'),
  ('Pilates día 3','Pilates','Nivel 2',45,'Abdomen'),
  ('Total Barre día 1','Total Barre','Nivel 1',45,'Piernas'),
  ('Total Barre día 3','Total Barre','Nivel 2',45,'Glúteos'),
  ('Respiración y calma','Mindfulness',null,45,'Mente'),
  ('Movimiento suave para la espalda','Pilates','Rehabilitación',45,'Espalda');

-- Evento y audio de ejemplo (para probar los pagos sueltos). El audio necesita un archivo subido al espacio «audios».
insert into public.eventos (titulo, descripcion, lugar, starts_at, aforo, precio_cents)
select 'Encuentro de primavera (ejemplo)',
       'Dos sesiones en directo de Mr.Matt, mindfulness, actividades, comida sana y gente con la que compartirlo.',
       '[Lugar]', ((current_date + 30)::timestamp + time '10:00') at time zone 'Europe/Madrid', 30, 3800
where not exists (select 1 from public.eventos);

insert into public.audios (titulo, descripcion, minutos, archivo)
select 'Respiración para dormir (ejemplo)', 'Una práctica guiada para soltar el día.', 15, 'ejemplo/respiracion-para-dormir.mp3'
where not exists (select 1 from public.audios);
