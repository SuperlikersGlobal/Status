# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Última actualización:** 2026-09-30

## Prioridad actual

### 1. Pernod

**Estado:** En progreso.

Checkpoint actual:
- código commitado: `783f5bdc0f30b829e01334a9b11cc513e04bf2eb`;
- Code RC PASS;
- Data RC PASS;
- F1806 golden 33/33;
- Fase A real PASS;
- Fase B real PASS;
- verificación visual en panel PASS;
- replay idempotente PASS;
- V2 intacto;
- FAILED_INVOICE_RECORD v0 commitado;
- capture/outbox v0 implementado localmente y aún no congelado;
- contrato de rejected invoices definido;
- histórico de cocktails analizado como evidencia, no como mapping automático.

## Gate actual

**Cerrar integración WP en homologación y ejecutar UAT.**

Pendientes inmediatos:
- corregir CORS para la prueba desde navegador;
- revisar el `404 NOT_FOUND` de routing;
- completar recheck/freeze del capture + outbox;
- cerrar el contrato de URL de imagen con WP;
- construir corpus v0 de cocktails sin modificar el master.

Después:
UAT → policy comercial real → producción controlada / rollback / handover.

Producción sigue no desplegada.
