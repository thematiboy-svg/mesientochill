# Avisos por WhatsApp

Además del email, la web puede enviar por WhatsApp los avisos de las clases a quien lo active (casilla en el registro y en Mi perfil, y con número de WhatsApp):

- **Reserva confirmada**, con el enlace de Zoom (o a Mis reservas si aún no lo hay).
- **Clase cancelada por Mónica.**
- **Plaza libre** en una clase en la que se está en lista de espera.

Se usa la API oficial de WhatsApp de Meta (Cloud API), sin intermediarios. El código está en `lib/whatsapp.ts`. Sin las variables de Meta no se envía nada por WhatsApp y todo sigue funcionando solo con email.

## 1. Base de datos (una vez)

En Supabase → SQL Editor ejecuta:

```sql
alter table public.profiles add column if not exists avisos_whatsapp boolean not null default false;
```

y vuelve a ejecutar la función `handle_new_user` de `supabase/schema.sql` (guarda la casilla del registro).

## 2. Cuenta de WhatsApp Business en Meta

1. Entra en [developers.facebook.com](https://developers.facebook.com) → **Mis apps** → **Crear app** → tipo **Empresa** → añade el producto **WhatsApp**. Vincúlala al portfolio comercial (Business Manager) de MeSientoChill.
2. **Número:** en WhatsApp → Configuración de la API, añade el número desde el que se enviarán los avisos y verifícalo por SMS o llamada. Tiene que ser un número que **no** esté en uso en la app de WhatsApp (ni normal ni Business); si lo está, hay que borrar esa cuenta antes. Meta no da números reales: vale una línea nueva (una SIM prepago) o un fijo, que se verifica por llamada. El número de prueba gratuito que ofrece Meta solo sirve para probar con hasta 5 destinatarios.
3. **Perfil:** nombre visible «MeSientoChill», foto (el símbolo del logo), descripción y web. Meta revisa el nombre visible.
4. **Verificación del negocio** en el portfolio comercial (Configuración → Centro de seguridad). Sin ella el límite es de unas 250 conversaciones al día, suficiente para el piloto.
5. **Pago:** añade una tarjeta en WhatsApp → Configuración de pago. Meta cobra por mensaje de plantilla; los avisos son de tipo **Utilidad** (en España, unos céntimos por mensaje: consulta la tarifa actual en la web de Meta).

## 3. Plantillas (tienen que estar aprobadas)

WhatsApp solo deja escribir primero a una persona con plantillas aprobadas. En WhatsApp Manager → **Plantillas de mensajes** → **Crear plantilla**, categoría **Utilidad**, idioma **Español**, con estos nombres y textos exactos (las `{{n}}` son variables; Meta pide un ejemplo para cada una):

**`msc_reserva_confirmada`**
```
Hola {{1}}, tu clase de {{2}} con Mónica el {{3}} está reservada. Entra al directo aquí: {{4}}

Si no puedes venir, cancela desde Mis reservas hasta 24 horas antes y no pierdes el crédito.
```
Ejemplos: `Ana` · `Pilates` · `lunes 17 de noviembre a las 11:00` · `https://www.mesientochill.com/app/reservas`

**`msc_clase_cancelada`**
```
Hola {{1}}, Mónica ha tenido que cancelar la clase de {{2}} del {{3}}. Si tenías plaza, el crédito vuelve a estar disponible. Puedes reservar otra clase aquí: {{4}}
```
Ejemplos: `Ana` · `Total Barre` · `martes 18 de noviembre a las 14:00` · `https://www.mesientochill.com/app/directos`

**`msc_plaza_libre`**
```
Hola {{1}}, se ha liberado una plaza en {{2}} con Mónica el {{3}}. Resérvala aquí: {{4}}

Hemos avisado también a otras personas de la lista de espera: se la queda quien reserve primero.
```
Ejemplos: `Ana` · `Mindfulness` · `jueves 20 de noviembre a las 19:00` · `https://www.mesientochill.com/app/directos`

Si cambias un texto o un nombre, cámbialo también en `lib/whatsapp.ts` (el orden de las variables es: nombre, disciplina, cuándo, enlace).

## 4. Variables en Vercel

En Vercel → Settings → Environment Variables (Production), marcadas como **Sensitive**:

- `WHATSAPP_TOKEN`: un token **permanente** de un usuario del sistema (portfolio comercial → Usuarios del sistema → Generar token, con los permisos `whatsapp_business_messaging` y `whatsapp_business_management`). El token temporal de la página de pruebas caduca en 24 horas.
- `WHATSAPP_PHONE_ID`: el «Identificador del número de teléfono» (no el número) de WhatsApp → Configuración de la API.
- Opcional `WHATSAPP_LANG`: código de idioma de las plantillas si no es `es` (por ejemplo `es_ES`).

Vuelve a desplegar y haz una reserva de prueba con tu número y la casilla activada.

## 5. Legal

Añadir a la Política de privacidad que, si la persona lo activa, su número se usa para enviarle avisos de sus clases por WhatsApp, con Meta Platforms Ireland como encargado del tratamiento, y que puede desactivarlo en Mi perfil.
