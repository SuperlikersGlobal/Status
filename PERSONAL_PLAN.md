# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Última actualización:** 2026-09-29

## Prioridad actual

### 1. Pernod

**Estado:** En progreso.

Checkpoint actual:
- código b71df3e;
- Code RC PASS;
- Data RC PASS;
- FULL 963, 0 failures/skips;
- F1806 golden 33/33;
- Fase A real PASS;
- Fase B real PASS;
- replay idempotente PASS;
- V2 intacto.

## Gate actual

**Verificación visual en panel pendiente.**

El smoke técnico ya validó:
foto → venta LEADER → venta CDC → replay sin duplicación.

Después:
verificación visual → UAT → policy comercial real → producción controlada / rollback / handover.

Producción sigue no desplegada.
