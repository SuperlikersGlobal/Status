# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Última actualización:** 2026-10-21

> La sección de Pernod conserva su último checkpoint del 08/10; la actualización del 21/10 corresponde únicamente a MyDesk.

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

**Estado:** En progreso — MyDesk online con migración inicial verificada. La última mejora de rendimiento está lista únicamente en local.

**Último avance confirmado (21/10):**
- MyDesk ya está publicado; se protegieron los datos y se ejecutó un corte controlado con respaldo final consistente.
- Jira DDP: 782 tareas abiertas migradas, más Programas, Historias y Sprints necesarios; 245 tareas antiguas preservadas. Verificación final: 1.027 tareas y cero problemas reportados.
- Solicitantes Jira conservados como autoría de origen, sin inventar usuarios; tareas sin responsables comprobados quedaron en triage.
- Ocho correcciones funcionales validadas en producción y navegación autenticada comprobada.
- Última corrección local de Lista/Kanban y arranque: 999/999 pruebas PASS; publicación y medición real pendientes. La carga fría inferior a 3 s no está acreditada.
- PR de integración todavía abierto; publicación automática mantenida bajo control.

**Próximo hito:** publicar la corrección de renderizado, verificar estabilidad y tiempos reales, cerrar el PR. Después reconciliar el delta de Jira y distribuir el trabajo en triage.

**Pendiente para abandonar Jira:** conciliar cambios posteriores al lote y verificar conservación del histórico concluido. La migración inicial no significa retirada de Jira.

**Detalle:** `projects/mydesk-jira/README.md` y `projects/mydesk-jira/updates/2026-10-21.md`.

**Fuera del alcance actual:** Calendar, hasta que Bruno defina el flujo deseado.
