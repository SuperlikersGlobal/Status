# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Última actualización:** 2026-10-21

> La actualización de MyDesk del 21/10 no sustituye el estado más reciente de Pernod: consultar su actualización fechada más nueva.

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

**Estado:** V0 técnica HECHA: MyDesk online y validado, PR de integración fusionado. La transición operativa desde Jira sigue en progreso.

**Último avance confirmado (21/10):**
- MyDesk desplegado con respaldos y rollback conservados; publicación automática todavía bloqueada.
- Migración inicial DDP: 782 tareas nuevas y jerarquía de Programas/Historias/Sprints; 245 tareas anteriores conservadas, con 1.027 tareas verificadas y cero problemas reportados.
- Ocho correcciones funcionales probadas en producción.
- Corrección de Lista y Kanban para alto volumen publicada y comprobada: renderizado sin bloqueos, búsqueda y filtros completos, paginación de 50.
- QA G4 PASS con la sesión real y sin escrituras; 999/999 pruebas locales PASS. Carga caliente 1,41–1,65 s; una medición fría de 5,56 s, aceptada temporalmente.
- PR #81 fusionado a `main` (`fef8f0d`); deploy validado permanece publicado.

**Feedback operativo del equipo (21/10, posterior al cierre técnico):**
- La reunión confirmó que la interfaz aún no sirve para sustituir Jira: «Subtarea Diseño» es un tipo de issue y no un equipo del destinatario; las tareas importadas siguen sin identidades vinculadas.
- Claude validó **localmente** mejoras de Backlog, sprints, filtro de responsables/«Sin asignar» y vencimiento del día; no se integraron ni desplegaron. 1.024/1.024 pruebas en TZ UTC durante el checkpoint de identidades.
- REA aún no observó el Jira autenticado, aunque sí se verificó MyDesk local y se consultó Jira por API. Se está preparando una copia de alta fidelidad del flujo operativo en MyDesk.
- Backfill local de e-mails: 37/782 tareas potencialmente vinculables con las identidades conocidas, 287 genuinamente sin responsable y 458 pendientes. CSV recibido con 44 cuentas Jira (23 superlikers.com / 21 iwin.im), pendiente de cotejo con las 65 identidades del manifiesto y el roster MyDesk.
- No hubo commit, push, deploy ni escritura externa de este trabajo posterior al cierre técnico.

**Próximo hito (operativo):** observar Jira autenticado con REA, lograr paridad funcional del Backlog/filtros/Kanban y validar el mapa de usuarios antes de cualquier backfill o publicación. Después, conciliar delta e histórico DDP para poder retirar Jira.

**Límites:** la V0 técnica está cerrada, pero Jira no fue retirado, el histórico completo no se considera conciliado y las tareas no fueron asignadas automáticamente.

**Detalle:** `projects/mydesk-jira/README.md` y `projects/mydesk-jira/updates/2026-10-21.md`.

**Fuera del alcance por ahora:** Calendar. Se definió como dirección el huso horario individual por usuario, pero no se implementó ni activó y quedó pausado.
