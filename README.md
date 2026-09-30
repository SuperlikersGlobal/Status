# Status v0

> **Uso interno de Superlikers. Antes de compartir este repositorio con el equipo, confirmar que la visibilidad en GitHub esté configurada como `Private`.**

Status v0 permite entender el trabajo de una persona sin tener que leer Git, commits o documentación técnica.

## Estado del piloto — 30/09/2026

**Pernod está en progreso.**

### Checkpoint técnico

- código base congelado: `b71df3e7ed73f2e57d4ff85f4d973cabe2e43d6b`;
- commit actual con FAILED_INVOICE_RECORD v0: `783f5bdc0f30b829e01334a9b11cc513e04bf2eb`;
- Code RC: PASS;
- Data RC: PASS;
- F1806 golden: 33/33 PASS;
- ambiente V4 paralelo;
- V2 intacto.

### Smoke real

Fase A:
- PASS;
- VALID;
- quantities 4.5 y 2.785714;
- cero efectos externos;
- replay PASS.

Fase B:
- PASS;
- REGISTERED;
- foto ACCEPTED;
- venta LEADER ACCEPTED;
- venta CDC ACCEPTED;
- replay sin duplicación;
- un único intent/result por efecto.

Verificación visual:
- **PASS**.

### Integración actual

- WP en homologación: en curso;
- primera prueba desde navegador alcanzó V4;
- CORS pendiente de ajuste temporal;
- routing `404 NOT_FOUND` pendiente de revisión;
- rejected invoices: contrato definido con `/v1/events` y `category = record_id`;
- capture/outbox v0 implementado localmente, aún sin freeze final;
- cocktails FY26 analizados como evidencia histórica, sin promoción automática al master.

## Gate actual

**Cerrar integración WP en homologación y ejecutar UAT.**

Después:
1. completar definiciones comerciales reales;
2. producción controlada;
3. rollback + handover.

Producción sigue no desplegada.

## Tabla ejecutiva

| Bloque | Estado |
|---|---|
| Parser / homologación técnica | **Hecho** |
| Durable pipeline + idempotencia | **Hecho** |
| V4 + nameless fix | **Congelado** |
| Code RC | **PASS** |
| Data RC | **PASS** |
| Smoke LABS Fase A | **PASS** |
| Smoke LABS Fase B | **PASS** |
| Verificación visual | **PASS** |
| Failed invoice record v0 | **Commitado** |
| Capture/outbox v0 | Implementado localmente / recheck pendiente |
| Integración WP | En curso |
| Cocktails FY26 | Analizado / corpus pendiente |
| UAT | Backlog |
| Producción controlada | Backlog |

## Reglas importantes

- Diferenciar siempre local, commitado, RC, homologación y producción.
- No marcar producción sin UAT y gates comerciales.
- La evidencia fechada más reciente prevalece sobre snapshots antiguos.
