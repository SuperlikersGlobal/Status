# Bruno — Status personal

## Cómo leer

1. PERSONAL_PLAN.md
2. projects/pernod/README.md
3. projects/pernod/updates/2026-10-05.md
4. projects/mydesk-jira/README.md
5. projects/mydesk-jira/updates/2026-10-08.md

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

## MyDesk + Jira — Estado al 08/10/2026

- **Objetivo:** trasladar gradualmente la gestión operativa de Jira al MyDesk existente.
- **Estado:** en progreso, con desarrollo y validación local.
- **Confirmado:** el MyDesk ya dispone de tareas, tableros, responsables e historial; se validó localmente el nuevo flujo de aceptación y la clasificación de la migración.
- **Avance reciente:** se analizó el trabajo abierto de Jira en solo lectura y se identificaron casos excepcionales de relación entre tareas para resolver antes de importar.
- **Pendiente:** cerrar esas excepciones, finalizar la preparación del importador y validar un piloto acotado.
- **Límite:** no se ejecutó migración real ni se confirmó despliegue de los cambios locales.
- **Próximo paso:** decidir el tratamiento de las excepciones y comprobar sólo los casos afectados.

Ver `projects/mydesk-jira/README.md` para más contexto.
