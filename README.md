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

La skill debe leer primero las reglas del repositorio y después traducir la evidencia a una respuesta breve y ejecutiva en español.

## Qué es cada cosa

### GitHub Issues = tareas operativas

Las Issues con marcador `STATUS_V0` representan trabajo concreto.

### Branch personal = contexto y evolución

La branch `bruno` contiene `PERSONAL_PLAN.md`, el contexto de Pernod y updates fechados.

### `/status` = traducción ejecutiva

La skill debe leer reglas, estado estructurado, branch personal y fechas antes de responder.

Una fuente antigua nunca anula evidencia posterior sólo por estar más estructurada.

## Estado del piloto — 28/09/2026

**Pernod está en progreso.**

Desde la actualización del 24/09 cambió de forma material el contrato con Andrés:

- request v3 usa `uid`, `cdc_uid`, `campaign_id` e imagen;
- foto va al LEADER por ahora;
- cada ticket elegible genera una venta para LEADER y otra para CDC;
- los códigos de producto usados en `retail/buy` fueron confirmados;
- campaign deja de estar fija.

También cambió la arquitectura de cantidad:

- COPA = 1 unidad canónica;
- BOTELLA = 14 unidades;
- se agregan unidades por referencia dentro del ticket;
- no se acumula entre tickets;
- el v4 propuesto convierte a botellas decimales sólo al construir `retail/buy`.

Ejemplo:

- 2 COPAS → 0.142857 botella;
- 14 COPAS → 1 botella.

La clasificación de producto fuera de campaña también pasa a ser explícita y gobernada: un producto conocido como fuera de campaña se excluye de la venta sin invalidar el resto del ticket; un nombre desconocido sigue fail-closed.

## Últimos avances confirmados

- C1 y C2 congelados localmente en el repo Pernod, sin push;
- RC reproducible desde C2 con verify independiente;
- E2E desde ZIP: foto + LEADER + CDC + replay sin duplicación;
- matrix de María fijada por SHA y convertida en artefacto governado offline;
- WU v4 fractional quantity + campaign scope implementado localmente;
- 930 tests, 18/18 mutantes dirigidos y E2E overlay PASS;
- ningún deploy de producción.

## Gate actual

**Recheck independiente del v4.**

Si pasa:

1. commit local;
2. RC nuevo;
3. verify + E2E del nuevo ZIP;
4. configurar matrix/scope/price gobernados;
5. smoke real en LABS con quantity fraccionaria;
6. UAT;
7. producción controlada.

## Pendencias principales

### Externas

- price real/gobernado;
- item_kind de los nombres usados en fixture;
- UIDs LEADER/CDC reales en LABS;
- validar que `retail/buy` acepte quantity fraccionaria y revisar el eco/puntos.

### Después

- cócteles;
- properties finales;
- timezone/date final;
- reconciliación automática de UNKNOWN.

La campaña todavía no ha iniciado. Los tickets históricos se usan para homologación/pre-lanzamiento.

## Tabla ejecutiva

| Bloque | Estado |
|---|---|
| Parser / homologación técnica original | **Hecho** |
| Durable pipeline + idempotencia | **Hecho** |
| Contrato v3 Andrés | **Cerrado técnicamente** |
| Dual sale LEADER + CDC | **Validado localmente** |
| Matrix gobernada offline | **Hecho / no activada** |
| V4 fractional quantity + campaign scope | **En recheck** |
| RC nuevo v4 | Pendiente |
| Smoke LABS fractional | Pendiente |
| UAT | Backlog |
| Producción controlada | Backlog |

## Reglas importantes

- No inventar porcentajes.
- No marcar producción sin evidencia.
- Diferenciar siempre: local, commitado, RC, homologación y producción.
- La evidencia fechada más reciente prevalece sobre snapshots antiguos.
