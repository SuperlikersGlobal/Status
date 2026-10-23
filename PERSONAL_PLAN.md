# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Última actualización:** 2026-10-22

> La actualización de MyDesk del 22/10 no sustituye el estado más reciente de Pernod: consultar su actualización fechada más nueva.

## Prioridad actual

### 1. Pernod

**Estado:** En progreso.

Checkpoint actual:
- producción review-only congelada localmente en `8a51851`;
- source-image core congelado en `c3fccd332fadaeae3c0bd8fed1278758d2a8086b`;
- source-image wiring de homologación congelado en `81b553cfcc345d672125a94d10e8db8ccbad080f`;
- RC source-image reproducible PASS;
- código desplegado sólo en Lambda V4-5c de homologación;
- `SOURCE_IMAGE_UPLOAD=ENABLED`;
- runtime probe confirmó source-image + capture wiring;
- primer smoke real source-image: HTTP 200 / NOT_VALIDATED / sin ventas;
- verificación de receipts/outbox del smoke todavía pendiente;
- primer `rejected_invoices` ya fue creado y verificado en panel;
- caller/request_id y comportamiento de `category` confirmados con Andrés;
- FAILED_INVOICE_RECORD, capture/outbox y durable-registration congelados;
- V2 intacto;
- producción no desplegada.

## Gate actual

**Verificar el smoke source-image de punta a punta sin reenviar la imagen.**

Pendientes inmediatos:
- leer `source_image_intent` / `source_image_result`;
- confirmar que la URL de SuperLikers quedó persistida;
- confirmar `outbox.image_url` igual a la URL gobernada;
- comprobar ausencia de efectos de venta;
- después construir/congelar el sender `rejected_invoices` con `image_url`;
- ejecutar UAT conjunto.

Después:
UAT → modo de producción source-image controlado → producción review-first → habilitación comercial por gates.

Producción sigue no desplegada.

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
