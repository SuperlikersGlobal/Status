# Bruno — Status personal

## Cómo leer

1. PERSONAL_PLAN.md
2. projects/pernod/README.md
3. projects/pernod/updates/2026-10-05.md
4. projects/mydesk-jira/README.md
5. projects/mydesk-jira/updates/2026-10-21.md

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

## MyDesk + Jira — Estado al 21/10/2026

- **Meta:** administrar el trabajo cotidiano desde MyDesk, conservando Jira hasta cerrar la transición.
- **Estado:** MyDesk online y primera migración de tareas DDP verificada; integración final y delta pendientes.
- **Avance:** 782 tareas Jira incorporadas; 245 tareas anteriores conservadas; integridad y ocho correcciones funcionales verificadas.
- **Ahora:** última optimización de Lista/Kanban validada solo localmente; falta publicarla y probar estabilidad con datos reales.
- **Próximo hito:** validar la publicación final y cerrar el PR; después reconciliar delta Jira y distribuir triage.
- **Límite:** no confundir migración inicial con cierre total de Jira ni pruebas locales con validación en producción. Calendar no forma parte de este avance.

Ver `projects/mydesk-jira/updates/2026-10-21.md` para el informe completo y la evidencia clasificada por estado.
