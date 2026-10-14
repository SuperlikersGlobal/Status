# Bruno — Status personal

## Cómo leer

1. PERSONAL_PLAN.md
2. projects/pernod/README.md
3. projects/pernod/updates/2026-10-05.md
4. projects/mydesk-jira/README.md
5. projects/mydesk-jira/updates/2026-10-14.md

## Estado actual — 05/10/2026

- Prioridad: Pernod
- Estado: En progreso — preparación controlada de producción
- Lectura y validación de facturas: funcionando en ambiente de pruebas
- Imagen de la factura: conservada y validada también cuando la factura es rechazada
- Facturas rechazadas: flujo preparado con la imagen incluida
- Envío automático de rechazadas: pendiente de dos confirmaciones finales de integración
- Producción: todavía no activa
- Primera versión de producción: preparada para revisión únicamente, sin ventas, puntos ni otros movimientos comerciales
- Acceso a producción: se definió que la revisión inicial será con una identidad separada de solo lectura
- Próximo paso: revisar AWS sin modificar nada y, después, pedir aprobación antes de crear recursos

## Gate actual

**Preparar el acceso de solo lectura y completar la revisión segura del ambiente de producción.**

Después:
revisión AWS → aprobación para crear infraestructura → despliegue sin acceso público → pruebas controladas → activación gradual.

## MyDesk + Jira — Estado al 14/10/2026

- **Objetivo:** que el equipo use MyDesk para organizar y completar las tareas nuevas, sin depender del Jira.
- **Estado:** versión piloto integrada y validada localmente; **aún no publicada** en el MyDesk oficial.
- **Último avance:** mejor organización de tareas, seguimiento y aceptación; correcciones para trabajar varias personas sin perder cambios; respaldo del código completo y recuperación probada.
- **Cambio de plan:** la prueba de importación desde Jira no conservó con suficiente seguridad los datos necesarios. El primer piloto comenzará con registro manual de las tareas activas.
- **Bloqueo:** falta proteger los datos actuales del MyDesk y coordinar una publicación verificable con la persona encargada del servicio.
- **Próximo hito:** publicar de manera controlada, definir un equipo y comenzar a gestionar sus tareas nuevas en MyDesk.

Ver `projects/mydesk-jira/updates/2026-10-14.md` para el avance del día.
