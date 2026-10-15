# Bruno — Status personal

## Cómo leer

1. PERSONAL_PLAN.md
2. projects/pernod/README.md
3. projects/pernod/updates/2026-10-05.md
4. projects/mydesk-jira/README.md
5. projects/mydesk-jira/updates/2026-10-15.md

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

## MyDesk + Jira — Estado al 15/10/2026

- **Meta:** que el primer equipo gestione tareas nuevas en MyDesk sin depender de Jira para el trabajo cotidiano.
- **Estado:** versión preparada y probada localmente, todavía no publicada.
- **Avance:** se respaldó y comprobó el código; el MyDesk oficial incorporó nuevas mejoras que vamos a integrar a la versión piloto.
- **Jira:** Bruno no tiene acceso a su respaldo. La migración histórica queda a cargo de alguien autorizado; el piloto empezará con tareas registradas manualmente.
- **Bloqueo:** todavía falta respaldo autorizado de los datos operativos actuales del MyDesk, además de la coordinación para publicar.
- **Próximo hito:** cerrar la integración local, respaldar los datos y validar el primer equipo después de la publicación.

Ver `projects/mydesk-jira/updates/2026-10-15.md` para el avance del día.
