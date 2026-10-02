# Status v0

> **Uso interno de Superlikers. Antes de compartir este repositorio con el equipo, confirmar que la visibilidad en GitHub esté configurada como `Private`.**

Status v0 permite entender el trabajo de una persona sin tener que leer Git, commits o documentación técnica.

## Estado del piloto — 02/10/2026

**Pernod está en progreso.**

### Checkpoint técnico

- smoke A/B histórico: PASS;
- verificación visual en panel: PASS;
- failed invoice record: congelado;
- capture/outbox + durable-registration: congelados y homologados;
- primer `rejected_invoices`: PASS y visible en panel;
- production review-only: congelada localmente, no desplegada;
- source-image core + wiring de homologación: congelados;
- RC source-image reproducible: PASS;
- Lambda V4-5c actualizada sólo en homologación;
- `SOURCE_IMAGE_UPLOAD=ENABLED`;
- V2 intacto.

### Integración actual

Andrés confirmó:
- caller/request_id;
- `distinct_id = uid`;
- misma `category` sobreescribe;
- la imagen se sube a SuperLikers;
- `/photos` devuelve `image_url`.

Runtime:
- source-image wiring ENABLED;
- capture wiring ENABLED.

Primer smoke real source-image:
- HTTP 200;
- NOT_VALIDATED;
- sin ventas ni crédito;
- falta verificar receipts + `outbox.image_url` antes de declarar PASS completo.

## Gate actual

**Cerrar evidencia del smoke source-image → sender rejected_invoices con imagen → UAT.**

Después:
1. producción source-image controlada;
2. producción review-first;
3. habilitación comercial por gates;
4. rollback + handover.

Producción sigue no desplegada.

## Tabla ejecutiva

| Bloque | Estado |
|---|---|
| Parser / homologación técnica | **Hecho** |
| Durable pipeline + idempotencia | **Hecho** |
| Smoke LABS Fase A/B | **PASS** |
| Verificación visual | **PASS** |
| Failed invoice record v0 | **Congelado** |
| Capture/outbox | **Homologado** |
| Durable registration | **Congelado** |
| Rejected invoices / primer evento | **PASS** |
| Integración WP / caller rules | **Confirmado** |
| Production review-only | **Congelado local / no desplegado** |
| Source-image core + wiring | **Congelado** |
| Source-image RC | **PASS** |
| Source-image runtime probe | **PASS** |
| Source-image smoke real | En verificación de receipts/outbox |
| Sender rejected_invoices + image_url | Siguiente bloque |
| UAT | Pendiente |
| Producción controlada | Pendiente |

## Reglas importantes

- Diferenciar siempre local, commitado, RC, homologación y producción.
- No marcar source-image PASS completo hasta verificar receipts + outbox.
- No marcar producción sin UAT y gates comerciales.
- La evidencia fechada más reciente prevalece sobre snapshots antiguos.
