# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Branch:** `bruno`  
**Periodo del plan:** 2026-09-17 → 2026-10-17  
**Última actualización:** 2026-09-28

## Prioridad actual

### 1. Pernod

**Estado actual:** En progreso.

El v4 fractional quantity + campaign scope ya pasó el freeze gate y quedó commitado localmente en:

`5b5d0fb976562c65f65f3c63ce8c3c85b7f35e14`

No hubo push ni deploy.

**Gate actual:** construir RC v4 reproducible desde ese commit.

## Camino crítico actual

| Bloque | Estado | Dependencia principal |
|---|---|---|
| Parser / OCR / frozen core | **Validado / congelado** | No tocar |
| Durable pipeline / idempotencia | **Validado** | — |
| Contrato v3 Andrés | **Cerrado técnicamente** | Smoke remoto |
| Dual sale LEADER + CDC | **Validado localmente** | Smoke remoto |
| Matrix María offline | **PASS** | item_kind/runtime activation |
| V4 fractional quantity + campaign scope | **Congelado / commit local** | RC build |
| Freeze validation | **947 tests / 30 mutants / 148 E2E PASS** | — |
| RC v4 reproducible | En progreso | Commit v4 |
| Data RC matrix/scope/price | Pendiente | Inputs gobernados |
| Smoke LABS fractional | Pendiente | RC + data + UIDs |
| UAT | Pendiente | Smoke |
| Producción controlada | Pendiente | UAT |

## Próxima secuencia

1. Construir RC v4 reproducible desde `5b5d0fb...`.
2. Verificar closure, hashes y reproducibilidad.
3. Ejecutar E2E desde el ZIP extraído.
4. Preparar data RC con matrix/scope/price gobernados.
5. Smoke LABS fractional.
6. UAT.
7. Producción controlada + handover.

## Inputs externos

### Andrés

- UID LEADER y CDC en LABS;
- campaign de homologación;
- validar fractional quantity y eco de invoice.

### María/Cami

- price gobernado;
- `item_kind` del fixture;
- reglas posteriores de cócteles/properties/date cuando apliquen.

## Avance técnico congelado

- COPA=1 / BOTELLA=14;
- aggregate antes de convertir;
- no cross-ticket accumulation;
- out-of-campaign explícito y gobernado;
- unknown fail-closed;
- receipt overflow 422 determinístico;
- quantity drift 202 / reconciliation sin repost;
- replay v3 preservado.

## Producción

No desplegada.

La campaña todavía no ha iniciado; tickets históricos se usan como fixtures de homologación.
