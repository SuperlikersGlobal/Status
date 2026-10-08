# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Última actualización:** 2026-10-08

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

**Estado:** En progreso — preparación y validación local; sin migración operativa.

**Meta:** gestionar el trabajo cotidiano de SuperLikers en MyDesk y retirar Jira gradualmente, sin construir un sistema paralelo.

**Avances confirmados:**
- decisión de reutilizar las tareas nativas de MyDesk, sus tableros, responsables e historial;
- nueva regla de revisión y aceptación de tareas implementada, probada y revisada localmente, aún no desplegada;
- mejora del importador para asociar el tablero del responsable incorporada al repositorio del MyDesk; despliegue no verificado;
- corrección local del estado de entrada de incidencias importadas;
- clasificación previa de la jerarquía de Jira validada con datos reales en modo solo lectura y sin importar;
- roadmap acordado: preparar un piloto, migrar por equipo y conservar Jira como archivo temporal.

**Gate actual:** resolver tres relaciones jerárquicas excepcionales y definir cómo conservar el trabajo registrado en elementos padre antes de habilitar la importación.

**Próximo hito:** acordar el tratamiento mínimo de estas excepciones, revalidar lo afectado y continuar el desarrollo únicamente en local.

**Detalle:** `projects/mydesk-jira/README.md` y `projects/mydesk-jira/updates/2026-10-08.md`.

**Jira y MyDesk operativo:** sin importación real ni cutover; ningún despliegue nuevo confirmado.
