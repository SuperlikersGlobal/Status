# Bruno — Status personal

## Cómo leer

1. PERSONAL_PLAN.md
2. projects/pernod/README.md
3. projects/pernod/updates/2026-10-02.md

## Estado actual — 02/10/2026

- Prioridad: Pernod
- Estado: En progreso — homologación source-image + cierre de delivery de rechazadas
- Checkpoint local congelado más reciente: `81b553cfcc345d672125a94d10e8db8ccbad080f`
- Producción review-only: implementada y congelada localmente en `8a51851`; no desplegada
- Source-image core: congelado en `c3fccd3`
- Source-image wiring homologación: congelado en `81b553c`
- RC source-image reproducible: PASS
- Lambda V4-5c de homologación: código nuevo desplegado y `SOURCE_IMAGE_UPLOAD=ENABLED`
- Runtime probe: `SOURCE_IMAGE_WIRING_ENABLED` + `CAPTURE_WIRING_ENABLED`
- Primer smoke real source-image: HTTP 200 / NOT_VALIDATED / sin ventas ni crédito
- Verificación pendiente del smoke: `source_image_result` + `outbox.image_url`
- FAILED_INVOICE_RECORD v0: congelado
- Capture/outbox + durable registration: congelados y homologados
- Primer `rejected_invoices`: HTTP 200 y verificado visualmente en panel
- Contrato con Andrés: caller/request_id confirmados; `distinct_id = uid`; misma `category` sobreescribe
- Imagen: `/photos` devuelve `image_url`; link debe acompañar el flujo de rechazadas
- WP: CORS/routing de homologación cerrados
- V2: intacto
- Producción: no desplegada

## Gate actual

**Cerrar la verificación de receipts + `outbox.image_url` del smoke source-image.**

Después:
sender `rejected_invoices` con imagen → UAT → preparación controlada de producción.
