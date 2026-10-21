# MyDesk + Jira

**Responsable:** Bruno  
**Estado:** En progreso — MyDesk online; migración inicial DDP verificada; última optimización local pendiente de publicación.  
**Última actualización:** 2026-10-21

## Objetivo

Que los equipos gestionen su trabajo cotidiano en MyDesk sin depender de Jira. La activación está en curso; Jira todavía conserva el histórico y los cambios posteriores al primer lote.

## Entregado y comprobado

- MyDesk publicado con tareas, estados, prioridades, responsables, comentarios, revisión y aceptación, Kanban, Lista, Programas, Historias, Sprints, búsqueda y Backlog.
- Respaldo final consistente y publicación controlada, con posibilidad de volver al deploy anterior.
- Primer lote Jira DDP migrado: **782 tareas**, **83 Programas**, **175 Historias** y **44 Sprints**.
- **245 tareas anteriores** preservadas: **1.027 tareas** verificadas tras el lote.
- Reservas de códigos y recibos de creación confirmados; cero problemas en la verificación posterior.
- Autoría Jira conservada sin crear usuarios ficticios. Las tareas sin responsable vinculado de forma comprobada quedaron en triage.
- **Ocho correcciones funcionales** probadas en producción mediante QA autenticado, sin problemas P0 reportados.

## En progreso

La Lista/Kanban podían bloquear el navegador con cientos de tareas. La corrección de representación progresiva (50 filas por vez y 50 tarjetas por columna) y arranque paralelo está **probada solo localmente**, con **999/999 pruebas PASS**. Quedan pendientes su publicación y la medición real. La carga fría anterior mejoró, pero no cumplió la meta de 3 segundos.

El PR de integración con la rama principal continúa abierto mientras se valida la última versión.

## Pendientes reales

- Publicar y validar en producción la última corrección, sin repetir la migración.
- Si pasa, integrar el PR y conservar el deploy validado con publicación automática controlada.
- Reconciliar el delta de Jira DDP posterior al manifiesto, asignar el trabajo en triage y validar la vista administrativa con una cuenta autorizada.
- Comprobar el histórico completo antes de retirar Jira. Las tareas cerradas no se importaron al tablero operativo.

**Calendar está fuera del alcance:** su flujo aún no fue definido por Bruno.

## Próximo hito

**Publicar mejora final → comprobar Lista/Kanban y tiempos reales → cerrar integración del código → continuar delta y triage.**

## Actualizaciones

- [21/10/2026 — Migración, go-live, QA y última optimización pendiente](updates/2026-10-21.md)
- [15/10/2026 — Integración y acceso a respaldos](updates/2026-10-15.md)
- [14/10/2026 — Preparación del piloto](updates/2026-10-14.md)
- [08/10/2026 — Decisión inicial y preparación](updates/2026-10-08.md)
