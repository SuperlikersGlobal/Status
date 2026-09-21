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

**Una fuente más antigua nunca debe anular evidencia más reciente solo por estar más estructurada.**

## Estado del piloto — 21/09/2026

**Meta de Pernod:** cerrar el alcance actual antes del **1 de octubre**.

**Ahora:** la capa de lectura y normalización ya fue validada con flujo real y dos layouts. El trabajo está en el **freeze final del parser + nuevo E2E remoto de prueba**.

**Próximo gate:** cerrar ese freeze y después avanzar a **elegibilidad + integración con Andrés**.

| Ventana | Tarea | Estado |
|---|---|---|
| 21–22/09 | Freeze final del parser + E2E remoto | En progreso |
| 22–24/09 | Elegibilidad + integración con Andrés | Ready |
| 24–25/09 | Acumulación + idempotencia mínima | Backlog |
| 26–28/09 | UAT + correcciones | Backlog |
| 29–30/09 | Producción controlada + rollback/handover | Backlog |
| 01/10 | Go-live / ajuste final | Backlog |

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
