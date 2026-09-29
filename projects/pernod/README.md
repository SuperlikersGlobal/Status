# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso — smoke técnico A/B PASS / verificación visual pendiente  
**Última actualización:** 2026-09-29

## Estado ejecutivo

El engine V4 está congelado y sus artefactos de release pasaron verificación reproducible.

- código: `b71df3e7ed73f2e57d4ff85f4d973cabe2e43d6b`;
- Code RC: PASS;
- Data RC: PASS;
- FULL: 963, 0 failures/skips;
- F1806 golden: 33/33.

## Homologación real

Ambiente V4 paralelo, sin modificar V2.

### Fase A
PASS:
- VALID;
- 4236 → `4.5`;
- 9885 → `2.785714`;
- SALE_PRICE_PENDING;
- cero efectos externos;
- replay PASS.

### Fase B
PASS:
- REGISTERED;
- foto ACCEPTED;
- venta LEADER ACCEPTED;
- venta CDC ACCEPTED;
- mismas quantities;
- replay con el mismo request_id;
- un único intent/result por efecto;
- logs limpios;
- V2 intacto.

## Gate actual

**Verificación visual en panel pendiente.**

Después:
1. UAT;
2. completar definiciones comerciales reales;
3. producción controlada + rollback + handover.

## Producción

No desplegada. El ambiente V4 actual y los datos TEST_ONLY son exclusivamente de homologación.

## Historial

Ver `updates/2026-09-29.md`.
