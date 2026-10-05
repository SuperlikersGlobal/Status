# Bruno — Status personal

## Cómo leer

1. PERSONAL_PLAN.md
2. projects/pernod/README.md
3. projects/pernod/updates/2026-10-05.md

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
