# Status v0

> **Uso interno de Superlikers. Antes de compartir este repositorio con el equipo, confirmar que la visibilidad en GitHub esté configurada como `Private`.**

Status v0 permite entender el trabajo de una persona sin tener que leer Git, commits o documentación técnica.

## Pernod — actualización 08/10/2026

**En progreso.** Integración y validación siguen abiertas. Producción y puesta en marcha permanecen pendientes.

| Bloque | Estado | Seguimiento |
|---|---|---|
| Procesamiento y homologación técnica | Hecho | [#1](https://github.com/SuperlikersGlobal/Status/issues/1) |
| Integración con Andrés | En progreso | [#2](https://github.com/SuperlikersGlobal/Status/issues/2) |
| Idempotencia mínima | Hecho | [#3](https://github.com/SuperlikersGlobal/Status/issues/3) |
| Validación con casos variados | En progreso | [#4](https://github.com/SuperlikersGlobal/Status/issues/4) |
| Producción y entrega | Pendiente | [#5](https://github.com/SuperlikersGlobal/Status/issues/5) |
| Puesta en marcha | Pendiente | [#6](https://github.com/SuperlikersGlobal/Status/issues/6) |

Las issues contienen las actualizaciones y los criterios de cierre de cada bloque. Los comentarios anteriores conservan el historial; no sustituyen el estado actual.

## MyDesk — cierre técnico de Bruno (21/10/2026)

**V0 técnica HECHA y en producción.** La capa de gestión de tareas de MyDesk ya está publicada, fue probada con volumen real y el PR de integración quedó fusionado a `main`. **La transición operativa desde Jira continúa** y no debe confundirse con el cierre técnico.

- **Migración:** 782 tareas abiertas de Jira DDP incorporadas, más estructuras de proyectos; 245 tareas anteriores preservadas. Total: 1.027 tareas verificadas sin problemas.
- **Producto:** Lista y Kanban fluidos con paginación de 50, búsqueda en todo el conjunto, filtros, Programas, Historias, Sprints, revisión y aprobación.
- **Validación:** ocho correcciones funcionales y último hotfix PASS en producción; navegador sin congelamientos y ningún error durante QA.
- **Código:** [PR #81 integrado](https://github.com/SuperlikersGlobal/ceodesk/pull/81); publicación automática permanece bloqueada.
- **Siguiente paso:** reconciliar cambios DDP posteriores al corte y asignar las tareas importadas en triage. Jira permanece disponible.
- **Límites:** carga fría por encima de 3 segundos aceptada temporalmente; Calendar fuera del alcance.

[Ver registro del cierre técnico](https://github.com/SuperlikersGlobal/Status/blob/bruno/projects/mydesk-jira/updates/2026-10-21.md)

## MyDesk — feedback operativo y preparación de paridad Jira (21/10/2026)

**En progreso, solo local.** La validación con usuarias frecuentes mostró que la V0 técnica publicada todavía no alcanza la experiencia de planificación y seguimiento de Jira.

- **Bloqueos P0:** filtro por tipo de tarea («Subtarea Diseño») y correspondencia entre identidades Jira y cuentas MyDesk. Las tareas de origen sin responsable deben seguir visibles en Backlog.
- **Avances locales, sin publicación:** organización del Backlog y sprints activos, filtros de responsable/«Sin asignar» y vencimientos del día. En el checkpoint posterior, **1.024/1.024 pruebas en UTC**; pruebas de reportes dependientes de fecha siguen fallando en TZ Bogotá.
- **REA:** MyDesk observado en Chrome local; observación de Jira autenticado aún bloqueada. Jira DDP inspeccionado por API en modo lectura. Próxima prioridad: reproducir el flujo real Backlog → filtros → tarea → Kanban con alta fidelidad.
- **Identidades:** conversión `@superlikers.com → @iwin.im` y backfill idempotente preparados localmente. Dry-run inicial: 37 de 782 tareas potencialmente vinculables, 287 originalmente sin asignar y 458 pendientes. Se recibió un export de **44 cuentas** para verificar su relación con las identidades Jira; ninguna reasignación en producción.
- **Calendar:** se discutió usar zona IANA por persona, sin implementación ni activación; trabajo pausado.

**Jira permanece en uso.** Estas correcciones y el mapeo no se han desplegado; cualquier cambio en producción requiere aprobación separada.

[Ver seguimiento operativo del 21/10](https://github.com/SuperlikersGlobal/Status/blob/bruno/projects/mydesk-jira/updates/2026-10-21.md)

## MyDesk — avance de Bruno (15/10/2026)

**En progreso.** La versión piloto ya fue probada localmente y está pendiente de actualización del servicio.

- **Avance:** respaldo del código terminado; preparación para incorporar mejoras recientes del MyDesk oficial.
- **Jira:** Bruno no tiene acceso al respaldo. La migración histórica queda con una persona autorizada; el piloto comenzará registrando tareas nuevas manualmente.
- **Bloqueo:** falta respaldar los datos actuales del MyDesk y coordinar su publicación.
- **Próximo hito:** integrar las mejoras recientes, preparar una publicación segura y comenzar con el primer equipo.

[Ver actualización del 15/10](https://github.com/SuperlikersGlobal/Status/blob/bruno/projects/mydesk-jira/updates/2026-10-15.md)

## MyDesk — avance de Bruno (14/10/2026)

**En progreso.** La nueva versión de gestión de tareas pasó las pruebas locales, pero todavía no está publicada para el equipo.

- **Último avance:** mejoras de organización, seguimiento y revisión de tareas; respaldo del código realizado y comprobado.
- **Cambio de plan:** el primer piloto utilizará tareas registradas manualmente, mientras Jira se conserva para consultas.
- **Pendiente:** respaldar los datos actuales y coordinar una publicación segura.
- **Próximo hito:** comenzar el trabajo nuevo de un primer equipo en MyDesk.

[Ver actualización del 14/10](https://github.com/SuperlikersGlobal/Status/blob/bruno/projects/mydesk-jira/updates/2026-10-14.md)
