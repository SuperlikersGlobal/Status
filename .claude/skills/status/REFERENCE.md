# Status — Execution Reference

Estas reglas complementan `STATUS_RULES.md` y son obligatorias para la skill `/status`.

## 1. Prioridad

1. seguridad y protección de datos;
2. instrucción explícita del usuario actual;
3. `STATUS_RULES.md`;
4. evidencia con fecha más reciente y respaldo explícito;
5. estado estructurado actual;
6. documentos de contexto;
7. defaults de esta skill.

La estructura por sí sola no da mayor autoridad a una fuente antigua.

## 2. Fuente operativa

Intentar primero:

- `curl -fsS --max-time 2 http://127.0.0.1:4173/api/status`
- `curl -fsS --max-time 2 http://127.0.0.1:4173/api/tasks`

Si responde, la API refleja las Issues `STATUS_V0`.

Si no responde, leer `data/status.json`, revisar `generated_at` y tratarlo como snapshot.

Después comparar siempre con las actualizaciones fechadas de la branch personal. Una actualización posterior al snapshot puede aportar hechos nuevos o redefinir el plan.

## 3. Lectura de branch personal

Nunca cambiar de branch solo para consultar estado.

Ejemplo:

- `git branch --list`
- `git show bruno:PERSONAL_PLAN.md`
- `git show bruno:projects/pernod/README.md`
- `git ls-tree -r --name-only bruno projects/pernod/updates/`
- `git show bruno:projects/pernod/updates/2026-09-21.md`

Elegir el update con fecha más reciente.

## 4. Tareas Status v0

Una tarea Status v0 es una GitHub Issue cuyo cuerpo contiene el marcador `STATUS_V0` con metadata JSON.

Metadatos actuales:

- `project`
- `owner`
- `status`
- `priority`
- `start`
- `due`
- `order`

## 5. Cuerpo de una tarea

Secciones usadas:

- `Qué estamos haciendo`
- `Por qué importa`
- `Avance confirmado` cuando aplica
- `Dependencia de entrada` cuando aplica
- `Criterio de finalización`
- `Detalle técnico`

Para una audiencia no técnica, priorizar significado, avance, criterio y siguiente gate.

## 6. Estado actual vs historia

- Issue y update coinciden → responder normalmente.
- Issue antigua y update posterior redefine fechas → explicar el plan vigente del update.
- Issue dice `done` pero update posterior muestra trabajo pendiente → señalar la inconsistencia; no declarar terminado sin resolverla.
- README histórico antiguo contradice una Issue/update más reciente → no repetirlo como estado actual.

## 7. Comentarios de Issues

Los comentarios representan actualizaciones cronológicas. Usarlos para `Último avance` cuando sean más recientes que otros registros.

Un comentario no cambia automáticamente el estado estructurado.

## 8. Evaluación de plazo

Para responder si algo está a tiempo:

- comparar fecha actual y fecha objetivo;
- identificar el gate actual;
- revisar evidencia más reciente;
- si una fecha intermedia venció pero existe un replanning explícito posterior, describir el replanning;
- si la fecha final venció y el alcance sigue abierto, decir el hecho sin especular sobre causa.

## 9. Traducción semántica

Simplificar sin alterar.

Correcto: `idempotencia mínima` → evitar que repetir el mismo procesamiento genere duplicados.

Incorrecto: `idempotencia mínima` → garantizar que nunca habrá errores.

## 10. Audiencia

Por defecto, asumir liderazgo/no técnico. Si el usuario pide detalle técnico, añadir una sección breve después de la explicación simple.

## 11. Trazabilidad

Cuando aporte valor, mencionar número de Issue, fecha de actualización o proyecto.

No mostrar SHAs, comandos Git o rutas internas salvo solicitud explícita.

## 12. Escritura

`/status` v0 es una skill de lectura y explicación. No debe editar Issues ni cambiar estados por defecto.

Si el usuario pide una modificación, esa es una acción separada de actualización.
