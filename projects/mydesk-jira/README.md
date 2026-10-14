# MyDesk + Jira

**Responsable:** Bruno  
**Estado:** En progreso — piloto validado localmente, pendiente de publicación.  
**Última actualización:** 2026-10-14

## Objetivo

Que los equipos de SuperLikers organicen, ejecuten y finalicen su trabajo en MyDesk, sin necesitar Jira para las tareas nuevas.

## Qué tenemos

- Gestión de tareas con responsables, estados, fechas y prioridades.
- Tableros, lista de trabajo, proyectos, historias y sprints.
- Comentarios, seguimiento de avances, revisión y aceptación de entregas.
- Versión nueva integrada con los cambios recientes del MyDesk existente.
- Pruebas locales satisfactorias de los flujos principales y del trabajo simultáneo.
- Respaldo del código actual y de la versión preparada, con recuperación comprobada.

**Importante:** estas mejoras están **probadas localmente, no publicadas aún** en el MyDesk oficial.

## Qué cambió respecto al plan anterior

La importación automática de tareas de Jira se probó con un grupo real en un entorno aislado, pero no permitió conservar con seguridad los responsables y relaciones necesarias.

**Decisión:** iniciar con carga manual de las tareas del primer equipo y mantener Jira como consulta histórica. No se han migrado tareas operativas.

## Bloqueo actual

Hace falta respaldar los datos actuales de MyDesk y coordinar la publicación con quien administra el servicio. El respaldo del código ya está terminado.

## Próximo hito

**Publicación controlada → validación con el primer equipo → trabajo nuevo gestionado en MyDesk.**

Antes del piloto se confirmarán el equipo, los responsables y quién puede ver cada tablero.

## Actualizaciones

- [14/10/2026 — Preparación del piloto](updates/2026-10-14.md)
- [08/10/2026 — Decisión inicial y preparación](updates/2026-10-08.md)
