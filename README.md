# Status v0

> **Uso interno de Superlikers. Antes de compartir este repositorio con el equipo, confirmar que la visibilidad en GitHub esté configurada como `Private`.**

Status v0 permite entender el trabajo de una persona sin tener que leer Git, commits o documentación técnica.

La primera prueba usa **Bruno / Pernod**.

## Para probarlo hoy

La experiencia principal no depende de la UI. Abre este repositorio en Claude Code sobre `main` y pregunta, por ejemplo:

- `/status ¿Cómo va Bruno con Pernod?`
- `/status ¿Qué está haciendo Bruno ahora?`
- `/status ¿Qué cambió desde la última actualización?`
- `/status ¿Hay algún bloqueo?`
- `/status ¿Qué viene después?`

La skill debe leer primero las reglas del repositorio y después traducir la evidencia a una respuesta breve y ejecutiva en español.

## Qué es cada cosa

### GitHub Issues = tareas operativas

Las Issues con marcador `STATUS_V0` representan trabajo concreto: estado, responsable, fechas, objetivo y criterio de finalización.

### Branch personal = contexto y evolución

Cada persona puede tener una branch propia. En el piloto, `bruno` contiene `PERSONAL_PLAN.md`, el contexto de Pernod y sus updates fechados.

### `/status` = traducción ejecutiva

La skill vive en `.claude/skills/status/` y debe leer reglas, estado estructurado, branch personal y fechas antes de responder.

**Una fuente más antigua nunca debe anular evidencia más reciente sólo por estar más estructurada.**

## Estado del piloto — 24/09/2026

**Meta de Pernod:** llegar a un flujo operativo y seguro antes del **1 de octubre**.

**Ahora:** la V0 de homologación validation-before-upload está desplegada y pasó un smoke real de punta a punta: OCR en vivo → `VALID` → upload `ACCEPTED` en SuperLikers LABS. El replay del mismo request produjo cero segundo efecto.

**Gate actual:** Andrés ya recibió endpoint, Postman/environment y token por separado. Falta su prueba de integración.

**Cambio importante:** el Ticket Engine ya no controla puntos, metas, reward_owner, redención o crédito para el flujo de Andrés. Su responsabilidad activa es validar el documento y registrar en SuperLikers sólo cuando la policy lo permite.

| Bloque | Estado |
|---|---|
| Parser / homologación técnica | **Hecho** |
| Durable pipeline + idempotencia | **Hecho** |
| Integración con Andrés | **En progreso** |
| Reglas comerciales / policy real | **Pendiente externo** |
| CDC / doble registro | Backlog |
| UAT + correcciones | Backlog |
| Producción controlada + rollback/handover | Backlog |
| Go-live / ajuste final 01/10 | Backlog |

## Último avance confirmado

- entorno AWS de homologación aislado;
- OCR real y parser/master ejecutados en runtime;
- SuperLikers LABS campaña `3z` aceptó un upload real;
- replay idempotente sin segundo upload;
- logs revisados sin exposición de key/token/base64/env/provider raw;
- policy temporal usada durante homologación revocada;
- handoff técnico enviado a Andrés.

## Pendencias inmediatas

### Andrés

Debe probar el endpoint desde su lado y confirmar que puede consumir el contrato.

### María/Cami

Ya están enviadas las preguntas sobre:

- equivalencia/variación de copas;
- si marca→usuario es gate previo o sólo regla posterior de puntos;
- tratamiento de cócteles antes del detalle final.

Después queda cerrar, si sigue pendiente:

- timezone oficial;
- fuente gobernada de la fecha del ticket.

### Producción

Después de Andrés + reglas comerciales:

1. policy real sin fixtures;
2. cerrar CDC/doble registro;
3. UAT variado/adversarial;
4. producción controlada;
5. rollback + handover;
6. go-live / ajuste final.

## Reglas importantes

- No inventar porcentajes de avance.
- No marcar una tarea como terminada sin evidencia suficiente.
- No convertir un plan futuro en trabajo realizado.
- Comparar siempre las fechas de las fuentes.
- Si dos fuentes se contradicen, usar la evidencia más reciente respaldada y explicar la discrepancia cuando importe.
- Por defecto, responder para una audiencia no técnica.

## UI experimental

La UI estilo Jira existe como experimento, pero **no es necesaria para validar Status v0**.

Modo demo: `npm start` y abrir `http://127.0.0.1:4173`.

Modo GitHub live: definir `GITHUB_TOKEN` y `GITHUB_REPO` en el entorno antes de iniciar.

Por seguridad, el servidor debe escuchar únicamente en `127.0.0.1` por defecto. El token nunca debe incluirse en archivos públicos ni commits.

## Relación con MyDesk

La v0 prueba el modelo antes de construir la interfaz definitiva: trabajo real → GitHub guarda tareas y evidencia → Status organiza contexto → Claude traduce para liderazgo → futura UI/MyDesk consume el mismo modelo.

Si este flujo resulta útil para Tati, la siguiente etapa es mejorar la experiencia de actualización y después conectar el modelo con MyDesk.
