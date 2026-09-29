# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso — Fase A real PASS / Fase B pendiente  
**Última actualización:** 2026-09-29

## Estado ejecutivo

El engine V4 está congelado localmente y los artefactos de release pasaron verificación reproducible.

- código: `b71df3e7ed73f2e57d4ff85f4d973cabe2e43d6b`;
- Code RC: PASS;
- Data RC: PASS;
- FULL: 963, 0 failures/skips;
- F1806 golden: 33/33.

## Homologación real

Se creó un ambiente V4 paralelo, sin modificar el V2 existente.

Fase A con F1806:
- HTTP 200;
- validation `VALID`;
- 4236 → `4.5`;
- 9885 → `2.785714`;
- `SALE_PRICE_PENDING`;
- foto no intentada;
- ventas LEADER/CDC no intentadas;
- replay idempotente;
- logs limpios;
- V2 intacto.

## Contrato

Request v3:
- `request_id`;
- `uid`;
- `cdc_uid`;
- `campaign_id`;
- `image`;
- `client_submitted_at` opcional.

Flujo elegible:

```text
foto LEADER
→ retail/buy LEADER
→ retail/buy CDC
```

## Gate actual

**Fase B de homologación.**

La siguiente acción es habilitar únicamente la price table TEST_ONLY en la Lambda V4 y reenviar el mismo request_id.

Expected:
1. foto LEADER;
2. venta LEADER;
3. venta CDC;
4. replay sin duplicación.

## Producción

No desplegada. Los datos TEST_ONLY y el ambiente V4 actual son exclusivamente de homologación.

## Historial

Ver `updates/2026-09-29.md`.
