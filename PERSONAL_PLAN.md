# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Última actualización:** 2026-10-30

> MyDesk y Pernod se resumen con sus respectivos checkpoints del 30/10. Las pruebas técnicas no sustituyen las habilitaciones operativas.

## Prioridad actual

### 1. Pernod

**Estado (30/10):** integración técnica de producción **PASS**; campaña comercial **PAUSED**.

**Confirmado:**
- Lambda `Pernod-production-v0` desplegada con OCR versionado, endpoint HTTP y token; cota AWS ampliada de 10 a 1.000 y concurrencia reservada **1**.
- Sondas reales: **401** sin token o con token incorrecto; **503 PAUSED** con token correcto. Sin activación de ventas de producción. Logs y ledger no pudieron leerse directamente para confirmar efectos de las sondas.
- LABS 5c: foto y venta CDC de homologación aceptadas. Una factura fechada 27/10, cargada 30/10, envió `properties.date` de la factura; persistencia final en el panel **pendiente**.
- Se compartieron instrucciones de integración a Andrés; su prueba desde el aplicativo sigue pendiente.

**Bloqueo comercial:**
- Confirmar con María precios/moneda/vigencia, atribución de 13 referencias de noviembre por CDC y 1.008 equivalencias.
- Resolver incompatibilidad entre asignación exacta por CDC y motor CDC-only; no autorizar distribución global por defecto sin confirmación.
- Confirmar con Andrés API key/host de fotos, campaña/CDC, reversión de ventas y propiedades persistidas.
- El bundle comercial no está en la Lambda desplegada. `ADMISSION=PAUSED`; inicio previsto 01/11/2026 (America/Bogota).

**Siguiente acción:** recibir definiciones de María y Andrés; después preparar solo el cambio de configuración/código indispensable y solicitar aprobación específica antes de activar una primera factura comercial.

**Detalle:** `projects/pernod/README.md` y `projects/pernod/updates/2026-10-30.md`.

### 2. MyDesk + Jira

**Estado (30/10):** mejoras operativas y UX publicadas; **NO-GO** para retirar Jira por falta de continuidad de datos, roles validados y pruebas operativas reales.

**Entregado:** deploy operativo `6ae4cc9eeff7af736d66fa6f` con 17 correcciones; deploy UX `6ae4f65069351504bd8e3ca8` con navegación Épica → Historia → Subtarea, estados e historial, componentes/plantillas del Jira, programas y formularios. Capacidad diaria estándar: **8 h netas**. Los cambios de PR #87 (worklog por sesiones) y #88 (consolidado de esfuerzo) no fueron incorporados en estos releases.

**Auditoría de 56 requisitos:** 18 PROD-PASS de lectura, 22 LOCAL-PASS y pendientes de producción, 6 FAIL y 10 BLOCKED. No se ha probado con escritura real el circuito completo KAM → equipo → líder → ejecutor → aprobación.

**Acceso:** ACCESS-01/02 mejoraron localmente el rol mostrado y el menú «Por asignar», pero **no están publicados**. La regla Líder por board + Tráfico es solo una propuesta de autorización; quedan sin resolver relaciones entre personas, boards y Épicas. No cambiar cadastros por inferencia.

**Datos e integración:** tareas nuevas del Jira sin conciliación por clave, elementos sin board, Calendar no activado, 1 % de cobertura útil en capacidad en el recorte auditado y adjuntos/comentarios/histórico Jira sin garantía de continuidad.

**Próxima acción:** validar responsables reales de boards y Tráfico; homologar el flujo completo con usuarios autorizados; reconciliar Jira y Calendar por origen, con rollback y sin duplicaciones; respaldar histórico antes del GO/NO-GO.

**Fecha anunciada al equipo:** Jira hasta 12/11 y uso exclusivo de MyDesk desde 13/11, sujeto a la decisión operativa.

**Detalle:** [resumen del proyecto](projects/mydesk-jira/README.md) y [actualización 27–30/10](projects/mydesk-jira/updates/2026-10-30.md).
