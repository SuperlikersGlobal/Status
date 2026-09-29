# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso — Code RC + Data RC listos / aguardando Andrés para rebuild final y smoke  
**Última actualización:** 2026-09-29

## Estado ejecutivo

El bloque local previo al smoke está listo.

- checkpoint de código: `b71df3e7ed73f2e57d4ff85f4d973cabe2e43d6b`;
- Code RC SHA-256: `1e96630cc6c07ed590f72feca8522946ce61a112e0429777e5dfd95067ac51fa`;
- Data RC SHA-256: `b3c6002e82bab74cfe1acb3892f91fd44b513c41059177f22e1fd23637a0fa12`;
- FULL 963, 0 failures/skips;
- F1806 golden 33/33;
- nameless matrix semantics corregida;
- sin push ni deploy.

## Contrato con Andrés

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

## Quantity

- COPA = 1 copa_unit;
- BOTELLA = 14 copa_units;
- aggregate por referencia;
- sin acumulación entre tickets;
- quantity fraccionaria sólo en retail/buy.

## Matrix

- OUT requiere clasificación gobernada;
- unknown permanece fail-closed;
- línea sin nombre queda unresolved y recibe veredicto normal;
- parser evidence malformada devuelve 422, no retry infinito.

## Fixture F1806

- 4236 → 63 copa_units → `4.5`;
- 9885 → 39 copa_units → `2.785714`.

## Gate actual

Esperar la explicación adicional de Andrés y recibir:
- campaign_id;
- uid LEADER;
- cdc_uid.

Luego:

1. rebuild final parametrizado;
2. verify + golden;
3. deploy controlado sin price;
4. Fase A;
5. habilitar price TEST_ONLY;
6. Fase B + replay;
7. confirmación de invoices.

## Producción

No desplegada. Los datos TEST_ONLY de homologación no son policy de producción.

## Historial

Ver `updates/2026-09-29.md`.
