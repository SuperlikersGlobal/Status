# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Última actualización:** 2026-10-15

> La sección de Pernod conserva su último checkpoint del 08/10; la actualización del 15/10 corresponde únicamente a MyDesk.

## Prioridad actual

### 1. Pernod

**Estado:** En progreso.

Checkpoint actual:
- producción review-only congelada localmente en `8a51851`;
- source-image core congelado en `c3fccd332fadaeae3c0bd8fed1278758d2a8086b`;
- source-image wiring de homologación congelado en `81b553cfcc345d672125a94d10e8db8ccbad080f`;
- RC source-image reproducible PASS;
- código desplegado sólo en Lambda V4-5c de homologación;
- `SOURCE_IMAGE_UPLOAD=ENABLED`;
- runtime probe confirmó source-image + capture wiring;
- primer smoke real source-image: HTTP 200 / NOT_VALIDATED / sin ventas;
- verificación de receipts/outbox del smoke todavía pendiente;
- primer `rejected_invoices` ya fue creado y verificado en panel;
- caller/request_id y comportamiento de `category` confirmados con Andrés;
- FAILED_INVOICE_RECORD, capture/outbox y durable-registration congelados;
- V2 intacto;
- producción no desplegada.

## Gate actual

**Verificar el smoke source-image de punta a punta sin reenviar la imagen.**

Pendientes inmediatos:
- leer `source_image_intent` / `source_image_result`;
- confirmar que la URL de SuperLikers quedó persistida;
- confirmar `outbox.image_url` igual a la URL gobernada;
- comprobar ausencia de efectos de venta;
- después construir/congelar el sender `rejected_invoices` con `image_url`;
- ejecutar UAT conjunto.

Después:
UAT → modo de producción source-image controlado → producción review-first → habilitación comercial por gates.

Producción sigue no desplegada.

### 2. MyDesk + Jira

**Estado:** En progreso — versión piloto validada localmente, todavía no publicada.

**Último avance confirmado (15/10):**
- funciones de tareas, tableros, responsables, seguimiento, revisión y aprobación probadas localmente;
- respaldo del código actual y la nueva versión realizado y recuperación comprobada;
- la versión oficial recibió actualizaciones adicionales; su integración local al piloto está **pendiente de finalizar**;
- Bruno no tiene acceso al respaldo de Jira; la recuperación/migración histórica queda a cargo de alguien autorizado y el primer equipo registrará tareas manualmente.

**Bloqueo:** falta acceso al respaldo de los datos reales del MyDesk y apoyo para la publicación controlada. El respaldo del código no cubre los datos de operación.

**Próximo hito:** integrar las actualizaciones oficiales con el piloto, proteger los datos reales y habilitar un primer equipo.

**Detalle:** `projects/mydesk-jira/README.md` y `projects/mydesk-jira/updates/2026-10-15.md`.

**Límite:** nada de esto se ha publicado todavía como nueva versión operativa.
