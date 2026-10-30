# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Última actualización:** 2026-10-22

> La actualización de MyDesk del 22/10 no sustituye el estado más reciente de Pernod: consultar su actualización fechada más nueva.

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

**Estado:** V0 técnica completada; **ocho correcciones de adopción y recuperación de contenido Jira comprobadas en producción**. La transición operativa desde Jira sigue abierta.

**Avance confirmado (22/10):**
- Hotfix operativo publicado y travado en Netlify, deploy `6ada3b6fb61900e56c164ead` (commit `15ad07e` **solo local**; todavía sin push a `ceodesk/main`). G4 con login real de Líder y lectura de datos reales: PASS, sin errores ni regresiones. **1.022/1.022 pruebas UTC** y **195/195 dirigidas en Bogotá**.
- Backlog, sprints actuales, filtros multiusuario/«Sin asignar», espacios, Kanban de seis columnas y paginación de 50, vencimientos por día y menú operativo simplificado funcionales. La sesión administrativa no fue validada; no se cambiaron tareas en esa prueba.
- Reunión del equipo detectó pérdida de briefs y plazos porque Jira DDP los guardaba en campos personalizados. **Backfill de contenido aprobado y ejecutado: 770/770 tareas actualizadas**, 12 intactas, cero conflictos. Se recuperaron 385 descripciones, 447 vencimientos, 415 inicios, 392 entregas, 750 países y 41 previews; descripción de DDP-55869 preservada. Cambiaron solo esos seis campos y `jiraSync`; verificación directa en MyDesk PASS.
- La consulta de Jira encontró **35 tareas ya cerradas/canceladas allí, pero abiertas en MyDesk**, y 284 tareas pasan a verse vencidas por recibir su plazo real. No atribuir incumplimientos individuales sin reconciliar estados, sobre todo antes de vincular identidades.

**En progreso o pendiente:**
- **`jiraType`**: backfill autorizado sobre 782 importadas y **ejecutándose con Opus**. Resultado pendiente: no registrarlo como éxito hasta recibir el informe.
- **Responsables/identidades**: aún sin vínculo seguro Jira→MyDesk; export de 44 cuentas requiere conciliación por accountId con las identidades de origen. Sin inventar asignaciones.
- **Trabajo entre equipos**: implementación local de «Al equipo» y cola «Por asignar», sin deploy. Faltan la decisión sobre líderes por tablero y el alta/control de áreas y roles; mantener restricciones de espacios sensibles.
- **Jerarquía/UX**: facilitar acceso operativo a Épicas e Historias, búsqueda y filtros dependientes; briefs por equipo y selección de informados todavía por mejorar. Reutilizar las relaciones existentes, no crear otro Jira.
- **Delta Jira**: 54 issues nuevas abiertas (50 tareas, tres Historias y una Épica) todavía no importadas; cambios de estados/board/billing solo mediante decisiones separadas.
- **Adjuntos, comentarios e histórico**: no migrados; preparar respaldo de Jira con archivos antes de cancelar suscripción. Se propuso convivencia temporal; **Jira no se retira sin prueba real del equipo y acuerdo con dirección**.
- **Código**: sincronizar `15ad07e` con GitHub mediante una acción separada; el deploy ya está por delante de `main`.

**Siguiente acción:** recibir el resultado del backfill `jiraType`; luego cerrar mapeo de responsables y permisos de líderes, validar «solicitar → equipo → asignación → ejecución», recuperar delta/histórico y acordar corte operativo. No repetir QA ya superado.

**Detalle:** `projects/mydesk-jira/README.md` y `projects/mydesk-jira/updates/2026-10-22.md`.

**Fuera del alcance por ahora:** Google Calendar y REA, pausados. Calendar conserva como dirección la zona horaria IANA por persona, aún no implementada ni activada.
