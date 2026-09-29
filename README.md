# Status v0

> **Uso interno de Superlikers. Antes de compartir este repositorio con el equipo, confirmar que la visibilidad en GitHub esté configurada como `Private`.**

Status v0 permite entender el trabajo de una persona sin tener que leer Git, commits o documentación técnica.

## Estado del piloto — 29/09/2026

**Pernod está en progreso.**

### Checkpoint técnico

- código congelado: `b71df3e7ed73f2e57d4ff85f4d973cabe2e43d6b`;
- Code RC: PASS;
- Data RC: PASS;
- Python FULL: 963;
- 0 failures / 0 skips;
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

## Gate actual

**Verificación visual en panel pendiente.**

Después:
1. UAT;
2. cerrar policy comercial real;
3. producción controlada;
4. rollback + handover.

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
| Verificación visual | Pendiente |
| UAT | Backlog |
| Producción controlada | Backlog |

## Reglas importantes

- Diferenciar siempre local, commitado, RC, homologación y producción.
- No marcar producción sin UAT y gates comerciales.
- La evidencia fechada más reciente prevalece sobre snapshots antiguos.
