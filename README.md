# Bruno — Status personal

## Cómo leer

1. PERSONAL_PLAN.md
2. projects/pernod/README.md
3. projects/pernod/updates/2026-09-30.md

## Estado actual — 30/09/2026

- Prioridad: Pernod
- Estado: En progreso — integración WP + UAT
- Código commitado actual: `783f5bdc0f30b829e01334a9b11cc513e04bf2eb`
- Code RC: PASS
- Data RC: PASS
- F1806 golden: 33/33 PASS
- Fase A real: PASS
- Fase B real: PASS
- Verificación visual en panel: PASS
- Replay idempotente: PASS
- V2: intacto
- FAILED_INVOICE_RECORD v0: commitado
- Capture/outbox v0: implementación local PASS; recheck independiente pendiente por baseline de archivos untracked, no por defecto encontrado
- Rejected invoices: contrato de integración definido con `/v1/events` y `category = record_id`
- Integración WP desde navegador: CORS y routing 404 pendientes de corrección
- Histórico de cocktails: recibido y analizado; no se promueve automáticamente al master
- Producción: no desplegada

## Gate actual

**Cerrar integración WP en homologación y ejecutar UAT.**

Después:
policy comercial real → producción controlada → rollback / handover.
