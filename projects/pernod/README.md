# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** Integración técnica de producción validada; operación comercial **PAUSED**  
**Última actualización:** 2026-10-30

## Estado ejecutivo

El motor de lectura de facturas funciona en homologación. La infraestructura y el acceso HTTP de producción ya están instalados y validados, pero **la campaña no está activa** y todavía no procesa fotos ni ventas comerciales.

- **Producción:** Lambda `Pernod-production-v0` con OCR versionado, concurrencia reservada **1**, autenticación por token y respuesta controlada durante la pausa.
- **Pruebas de acceso:** HTTP **401** sin token o con token incorrecto; HTTP **503 PAUSED** con token válido. La cota regional de concurrencia de la cuenta fue ampliada a **1.000**.
- **Control comercial:** `ADMISSION=PAUSED`; no hay bundle final de precios ni credenciales comerciales instaladas. El endpoint disponible **no equivale a campaña activa**.
- **Homologación 5c:** foto y venta CDC aceptadas en SuperLikers staging, sin venta LEADER. El 30/10 se procesó una factura de fecha 27/10 y se envió `properties.date` según la factura, no la carga. La persistencia de esa propiedad en el panel todavía requiere confirmación de Andrés.

## Bloqueos para activar ventas reales

1. **María / Pernod:** precio comercial, moneda y vigencia por referencia; confirmar elegibilidad de las 13 referencias de noviembre por CDC y validar la matriz local de 1.008 equivalencias.
2. **Motor de reglas:** las asignaciones exactas por CDC son incompatibles con el requisito CDC-only actual. La asignación general no se usará sin autorización comercial; en caso de segmentación, corregir el código antes de activar.
3. **Andrés / SuperLikers:** credencial API y host de fotos de producción, contrato de API, campaña e identificadores CDC, procedimiento de anulación y confirmación en panel de las propiedades de la venta de homologación.
4. **Despliegue comercial:** cerrar bundle de precios y configuración de producción, aprobar nueva publicación y definir una prueba de venta real independiente. Conservar `ADMISSION=PAUSED` hasta esa autorización.

El periodo comercial previsto empieza el **01/11/2026**, con zona horaria **America/Bogota**. No se adelantará para generar ventas de prueba.

## Próximo paso

Recibir las confirmaciones de María y Andrés; luego completar el bundle o la corrección puntual de reglas necesaria. **No reconstruir ni desplegar otro ZIP antes de resolver esas dependencias.** Retirar los permisos IAM temporales restantes al cerrar el handoff de integración.

## Historial

Ver:
- `updates/2026-10-22.md`
- `updates/2026-10-30.md`

Las actualizaciones anteriores siguen disponibles en `updates/`.
