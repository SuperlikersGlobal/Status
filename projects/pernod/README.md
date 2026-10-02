# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso — source-image homologación activa / delivery de rechazadas en cierre  
**Última actualización:** 2026-10-02

## Estado ejecutivo

La homologación V4 ya pasó el smoke A/B histórico, panel visual, capture de failed invoices y el primer evento `rejected_invoices`. El foco actual es cerrar la URL de imagen de punta a punta antes de automatizar el sender.

Checkpoint local:
- producción review-only: `8a51851`;
- source-image core: `c3fccd332fadaeae3c0bd8fed1278758d2a8086b`;
- source-image wiring homologación: `81b553cfcc345d672125a94d10e8db8ccbad080f`;
- RC source-image: reproducible PASS;
- Lambda V4-5c: nuevo código desplegado sólo en homologación;
- `SOURCE_IMAGE_UPLOAD=ENABLED`;
- V2 permanece intacto.

## Integración con Andrés / WP

Contrato confirmado:
- caller: ejecutivo o gerente;
- el usuario que envía queda como `uid`;
- CDC se identifica por tag/regla acordada;
- upload nuevo → `request_id` nuevo;
- retry técnico del payload exacto → mismo `request_id`;
- cambio de imagen/payload → `request_id` nuevo;
- para `rejected_invoices`, `distinct_id = request.uid`;
- repetir la misma `category` sobreescribe el evento existente.

CORS/routing del endpoint V4 de homologación ya quedaron corregidos.

## Failed invoices / rejected_invoices

Estado:
- `FAILED_INVOICE_RECORD v0`: congelado;
- capture/outbox: congelado y desplegado en homologación;
- durable registration: congelado;
- primer evento `rejected_invoices`: HTTP 200 y verificado visualmente en panel;
- `category = record_id`;
- `properties.info = record_json` gobernado;
- imagen/link: requerida por Andrés.

## Source image

Andrés confirmó que la imagen se sube a SuperLikers y que `POST /v1/photos` devuelve `image_url`.

Se implementó un stage separado de source-image para homologación:
- URL fuera de FAILED_INVOICE_RECORD y fuera de `record_id`;
- duplicate IMAGE local no vuelve a subir;
- CONTENT duplicate usa su propia imagen;
- provider 177 no inventa URL;
- VALID reutiliza el source upload, evitando un segundo `/photos`;
- producción review-only continúa con cero efectos externos.

Runtime probe:
- `SOURCE_IMAGE_WIRING_ENABLED`;
- `CAPTURE_WIRING_ENABLED`.

Primer smoke real con imagen nueva:
- HTTP 200;
- `NOT_VALIDATED`;
- `duplicate_of = null`;
- foto de registro NOT_ATTEMPTED;
- ventas NOT_ATTEMPTED;
- crédito false.

Todavía no se marca PASS end-to-end del source-image: falta leer los receipts y confirmar `outbox.image_url`.

## Gate actual

1. verificar `source_image_intent/result` del smoke;
2. confirmar `outbox.image_url` y ausencia de ventas;
3. cerrar/congelar sender `rejected_invoices` con imagen;
4. ejecutar UAT;
5. preparar producción controlada.

## Producción

No desplegada.

Existe un modo `PRODUCTION_REVIEW_ONLY` congelado localmente, pero la producción source-image será una etapa separada y explícita después de homologación + sender + UAT.

## Historial

Ver:
- `updates/2026-09-30.md`
- `updates/2026-10-02.md`
