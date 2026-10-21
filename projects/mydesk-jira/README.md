# MyDesk + Jira

**Responsable:** Bruno  
**Estado:** V0 técnica COMPLETADA y probada en producción; transición operativa de Jira en progreso.  
**Última actualización:** 2026-10-21

## Objetivo

Que los equipos de SuperLikers gestionen su trabajo cotidiano en MyDesk, sin necesidad de abrir Jira para las tareas nuevas. La V0 técnica ya funciona; todavía falta cerrar el cambio operativo del equipo.

## Entregado y comprobado

- MyDesk en producción con tareas, responsables, estados, prioridades, fechas, comentarios, revisión y aprobación, Lista, Kanban, Programas, Historias, Sprints, búsqueda y Backlog.
- Migración inicial Jira DDP: **782 tareas**, **83 Programas**, **175 Historias** y **44 Sprints**, conservando **245 tareas anteriores** de MyDesk. Total verificado: **1.027 tareas**, cero problemas de integridad.
- Copia consistente antes del corte, códigos reservados sin duplicados y rollback de código disponible.
- El origen Jira se conserva sin inventar usuarios; tareas con responsable no identificado de forma comprobada permanecen en triage.
- **Ocho correcciones funcionales** validadas en producción.
- Lista y Kanban ya no se bloquean con más de 900 tareas: 50 ítems visibles inicialmente y opción de mostrar más. El G4 de producción pasó con la cuenta real, sin escrituras ni errores.
- **Último deploy validado:** `6ad8cc341cd5e9302016d093` (`d40cf0e`).
- **Integración de código finalizada:** [PR #81](https://github.com/SuperlikersGlobal/ceodesk/pull/81) fusionado a `main` (`fef8f0d`). Publicación automática permanece bloqueada.

## Límites y pendientes

- **Jira no está retirado:** falta conciliar lo que cambió después del manifiesto DDP, asignar las tareas en triage y comprobar el histórico necesario antes del abandono.
- **Rendimiento frío:** una medición real de 5,56 s, por encima de la antigua meta de 3 s; aceptado temporalmente. Cargas calientes observadas entre 1,41 y 1,65 s.
- **Detalle no bloqueante:** una etiqueta incorrecta para el estado `rejected` cuando se agrupa por Estado.
- **Control de deploy:** `stop_builds=false` permite crear builds, aunque el auto-publish permanece bloqueado.
- **Calendar fuera del alcance:** el flujo deseado aún no fue definido.

## Próximo hito

**Asignar responsables en triage y reconciliar el delta DDP, con evidencia y aprobación, sin repetir la migración ni el QA ya aprobado.**

## Actualizaciones

- [21/10/2026 — Cierre técnico de V0, migración, producción y QA](updates/2026-10-21.md)
- [15/10/2026 — Integración y acceso a respaldos](updates/2026-10-15.md)
- [14/10/2026 — Preparación del piloto](updates/2026-10-14.md)
- [08/10/2026 — Decisión inicial y preparación](updates/2026-10-08.md)
