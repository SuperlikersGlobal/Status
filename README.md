# Status v0

> **Uso interno de Superlikers. Antes de compartir este repositorio con el equipo, confirmar que la visibilidad en GitHub esté configurada como `Private`.**

Status v0 permite entender el trabajo de una persona sin tener que leer Git, commits o documentación técnica.

La primera prueba usa **Bruno / Pernod**.

## Para probarlo hoy

Abre este repositorio en Claude Code sobre `main` y pregunta, por ejemplo:

- `/status ¿Cómo va Bruno con Pernod?`
- `/status ¿Qué está haciendo Bruno ahora?`
- `/status ¿Qué cambió desde la última actualización?`
- `/status ¿Hay algún bloqueo?`
- `/status ¿Qué viene después?`

## Estado del piloto — 29/09/2026

**Pernod está en progreso.**

El contrato v3 con Andrés ya está cerrado técnicamente:

- request con `uid + cdc_uid + campaign_id + image`;
- foto al LEADER;
- una venta LEADER y una venta CDC;
- misma campaign/products;
- CDC usa ref `-cdc`.

## V4 congelado

El v4 fractional quantity + campaign scope ya no está en recheck.

El checkpoint actual quedó commitado localmente en el repo Pernod:

`b71df3e7ed73f2e57d4ff85f4d973cabe2e43d6b`

Sin push y sin deploy.

Freeze validado con:

- Python **963**;
- 2 expected failures conocidos;
- 0 fallos/skips reales;
- Code RC reproducible: **PASS**;
- Data RC reproducible: **PASS**;
- F1806 golden: **33/33 PASS**.

## Arquitectura congelada

- COPA = 1 unidad;
- BOTELLA = 14 unidades;
- aggregate por referencia dentro del ticket;
- no cross-ticket accumulation;
- fractional quantity sólo al montar `retail/buy`;
- producto explícitamente OUT puede excluirse;
- unknown sigue fail-closed;
- quantity drift exige reconciliation sin repost;
- receipt capacity falla 422 de forma determinística.

## Gate actual

**Fase A real PASS. Gate actual: Fase B de homologación en el ambiente V4 paralelo.**

Después:

1. habilitar price TEST_ONLY sólo en V4;
2. reenviar el mismo request_id;
3. validar foto LEADER + venta LEADER + venta CDC;
4. replay sin duplicación;
5. confirmación en panel;
6. UAT;
7. producción controlada.

## Pendencias externas

- price gobernado;
- `item_kind` del fixture;
- UIDs LEADER/CDC LABS;
- validar fractional quantity/echo/points en LABS.

La campaña todavía no ha iniciado. Los tickets históricos actuales son fixtures de homologación/pre-lanzamiento.

## Tabla ejecutiva

| Bloque | Estado |
|---|---|
| Parser / homologación técnica original | **Hecho** |
| Durable pipeline + idempotencia | **Hecho** |
| Contrato v3 Andrés | **Cerrado técnicamente** |
| Dual sale LEADER + CDC | **Validado localmente** |
| Matrix gobernada offline | **Hecho / no activada** |
| V4 + nameless fix | **Congelado / commit local** |
| Code RC | **PASS** |
| Data RC | **PASS** |
| Smoke LABS Fase A | **PASS** |
| Smoke LABS Fase B | **Pendiente** |
| UAT | Backlog |
| Producción controlada | Backlog |

## Reglas importantes

- Diferenciar siempre local, commitado, RC, homologación y producción.
- No marcar producción sin smoke + UAT.
- La evidencia fechada más reciente prevalece sobre snapshots antiguos.


## Checkpoint Fase A — 29/09

- ambiente V4 paralelo creado sin modificar V2;
- F1806 real: HTTP 200 / VALID;
- 4236 = 4.5;
- 9885 = 2.785714;
- SALE_PRICE_PENDING;
- foto y ventas no intentadas;
- replay idempotente;
- evidencia DynamoDB/S3 coherente;
- logs limpios;
- V2 confirmado intacto.
