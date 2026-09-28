# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso — v4 congelado localmente / RC v4 en construcción  
**Última actualización:** 2026-09-28

## Objetivo

Construir un **Pernod Ticket Processing Engine** independiente del canal de entrada, capaz de validar tickets y ejecutar efectos idempotentes en SuperLikers para LEADER y CDC.

## Contrato v3 con Andrés

Request:

- `request_id`;
- `uid`;
- `cdc_uid`;
- `campaign_id`;
- `image`;
- `client_submitted_at` opcional.

Flujo:

```text
VALID
→ foto LEADER
→ retail/buy LEADER
→ retail/buy CDC
```

LEADER usa ref base; CDC usa ref base + `-cdc`.

## Checkpoints locales

- C1: `b676e90...`
- C2: `2d36f48...`
- V4 congelado: `5b5d0fb976562c65f65f3c63ce8c3c85b7f35e14`
- Tree v4: `170ab08fb0de23249897bc177b4212ff0cc6588b`

El v4 está commitado localmente y no fue pushado.

## Qué incluye el v4 congelado

- `sale-plan-v4`;
- evaluator v0.5;
- `SaleAmount` en copa units;
- COPA=1 / BOTELLA=14;
- fractional bottle quantity sólo en la borda;
- campaign scope gobernado;
- `out_of_campaign_products`;
- warning stripping fail-closed;
- receipt capacity por `receipt_budget(...).fits`;
- overflow determinístico 422;
- quantity drift → reconciliation 202 sin repost;
- compatibilidad de replay con sale-plan-v3.

## Validación del freeze

- Python: **947**;
- expected failures: 2 conocidos;
- fallos/skips reales: 0/0;
- JS: **16/16**;
- mutantes: **30/30**;
- E2E: **148/148**;
- v3 resume: PASS;
- freeze files: intactos.

## Matriz de María

Fuente SHA-256:

`d74130f40affc401dd3b61af8b5a59f8e3068e9a7fc39321276e6b9c649f3309`

Artefacto offline:

- 1.681 lookup keys;
- 0 colisiones elegibles.

La matriz todavía no está activada como policy runtime real. Falta gobernar `item_kind` de los nombres usados en fixture.

## Quantity policy

Default:

`pernod-copa-fraction@1`

Regla:

```text
COPA = 1 copa_unit
BOTELLA = 14 copa_units
quantity_outbound = copa_units / 14
```

No existe acumulación entre tickets.

## Out of campaign

Una línea sólo puede salir del scope si existe clasificación gobernada explícita.

OUT:
- se preserva para auditoría;
- no entra en retail;
- no exige price.

Unknown:
- sigue fail-closed.

## Gate actual

**Construir y verificar RC v4 reproducible desde `5b5d0fb...`.**

Después:

1. E2E desde ZIP extraído;
2. data RC con matrix/scope/price gobernados;
3. smoke LABS fractional;
4. UAT;
5. producción controlada.

## Inputs externos

### Andrés

- UID LEADER LABS;
- `cdc_uid` LABS;
- campaign de homologación;
- validación de fractional quantity/echo/points.

### María/Cami

- price gobernado;
- `item_kind` del fixture;
- reglas finales posteriores cuando sean necesarias.

## Riesgos abiertos

- fractional quantity aún no verificada en LABS;
- price real no configurado;
- data policies reales todavía no empacadas;
- outcomes UNKNOWN siguen requiriendo reconciliación;
- RC v4 aún no construido.

## Campaña

La campaña todavía no ha iniciado. Los tickets históricos actuales son fixtures de homologación/pre-lanzamiento.

## Historial

Ver `updates/2026-09-28.md`.
