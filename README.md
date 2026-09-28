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

## Estado del piloto — 28/09/2026

**Pernod está en progreso.**

El contrato v3 con Andrés ya está cerrado técnicamente:

- request con `uid + cdc_uid + campaign_id + image`;
- foto al LEADER;
- una venta LEADER y una venta CDC;
- misma campaign/products;
- CDC usa ref `-cdc`.

## V4 congelado

El v4 fractional quantity + campaign scope ya no está en recheck.

Quedó commitado localmente en el repo Pernod:

`5b5d0fb976562c65f65f3c63ce8c3c85b7f35e14`

Sin push y sin deploy.

Freeze validado con:

- Python **947**;
- 2 expected failures conocidos;
- 0 fallos/skips reales;
- JS **16/16**;
- mutantes **30/30**;
- E2E **148/148**.

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

**Construir un RC v4 reproducible desde el commit congelado.**

Después:

1. verify + E2E desde ZIP;
2. data RC con matrix/scope/price;
3. smoke LABS fractional;
4. UAT;
5. producción controlada.

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
| V4 fractional quantity + campaign scope | **Congelado / commit local** |
| RC nuevo v4 | **En progreso** |
| Smoke LABS fractional | Pendiente |
| UAT | Backlog |
| Producción controlada | Backlog |

## Reglas importantes

- Diferenciar siempre local, commitado, RC, homologación y producción.
- No marcar producción sin smoke + UAT.
- La evidencia fechada más reciente prevalece sobre snapshots antiguos.
