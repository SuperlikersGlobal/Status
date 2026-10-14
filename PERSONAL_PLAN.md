# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Última actualización:** 2026-10-14

> La sección de Pernod conserva su último checkpoint del 08/10; esta actualización incorpora únicamente el avance de MyDesk.

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

**Estado:** En progreso — versión piloto probada localmente; todavía no publicada.

**Meta:** que SuperLikers gestione sus tareas cotidianas desde MyDesk y reduzca gradualmente el uso de Jira.

**Último avance confirmado (14/10):**
- funciones para organizar, asignar, revisar y finalizar tareas integradas y validadas en pruebas locales;
- corregidos problemas de cambios simultáneos y tareas duplicadas, sin dar por comprobado todavía el comportamiento del servicio publicado;
- incorporados cambios recientes del MyDesk existente;
- respaldo del código actual y de la versión preparada completado y recuperación comprobada;
- prueba de importación de Jira no apta para el piloto; se eligió registrar manualmente el trabajo inicial.

**Bloqueo actual:** falta respaldar los datos reales del MyDesk y coordinar la publicación y su verificación con el responsable del servicio.

**Próximo hito:** preparar una publicación controlada y confirmar equipo, responsables y tablero para el primer piloto.

**Detalle:** `projects/mydesk-jira/README.md` y `projects/mydesk-jira/updates/2026-10-14.md`.

**Límite:** los cambios nuevos no están publicados y Jira no ha sido sustituido todavía.
