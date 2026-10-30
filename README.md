# Bruno — Status personal

## Cómo leer

1. PERSONAL_PLAN.md
2. projects/pernod/README.md
3. projects/pernod/updates/2026-10-05.md
4. projects/mydesk-jira/README.md
5. projects/mydesk-jira/updates/2026-10-30.md

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

## MyDesk + Jira — actualización 30/10/2026

- **Publicado:** dos releases técnicos de 30/10; último deploy `6ae4f65069351504bd8e3ca8`, activo y locked. Incluye Épica → Historia → Subtarea, programas/componentes del Jira, formularios, correcciones de tareas y capacidad de **8 h netas**.
- **Auditoría:** 56 requisitos; 18 PASS de lectura en producción, 22 solo locales, 6 fallos y 10 bloqueados. Falta homologación de escritura con roles reales.
- **Acceso:** ACCESS-01/02 tiene PASS local, **no publicado**. Responsables de boards, política de Tráfico y cadastros efectivos siguen pendientes; ningún permiso se cambió.
- **Continuidad:** delta Jira y Calendar pendientes; **NO-GO para retirar Jira**, pese a la meta operativa comunicada del 13/11.

[Ver actualización 27–30/10](projects/mydesk-jira/updates/2026-10-30.md).

## MyDesk + Jira — Cierre técnico V0 al 21/10/2026

- **Meta:** gestionar trabajo cotidiano en MyDesk y retirar Jira solo tras completar la transición operativa.
- **Resultado:** V0 técnica entregada, validada y en producción, con PR #81 integrado a `main` (`fef8f0d`).
- **Migración inicial:** 782 tareas Jira y 245 tareas anteriores conservadas; 1.027 verificadas, sin problemas reportados.
- **QA:** ocho correcciones funcionales y renderizado progresivo de Lista/Kanban comprobados en producción con más de 900 tareas; sin congelamientos.
- **Pendiente operativo:** delta Jira posterior al corte, asignación de triage y verificación del histórico antes de abandonar Jira.
- **Límites:** carga fría superior a la antigua meta de 3 segundos aceptada por ahora; auto-publish bloqueado; Calendar fuera del alcance.

[Ver el cierre técnico y las evidencias](projects/mydesk-jira/updates/2026-10-21.md).
