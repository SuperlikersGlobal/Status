# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Branch:** `bruno`  
**Periodo del plan:** 2026-09-17 → 2026-10-17  
**Última actualización:** 2026-09-28

## Prioridad actual

### 1. Pernod

**Meta:** cerrar una homologación segura, auditable y lista para UAT antes de producción.

**Estado actual:** En progreso. El contrato v3 con Andrés ya está definido, el dual registration LEADER/CDC está implementado localmente y la arquitectura de cantidad COPA/BOTELLA fue rediseñada para conservar toda la información sin estado cross-ticket.

**Gate actual:** recheck independiente del v4 fractional quantity + campaign scope.

La campaña todavía no ha iniciado. Los tickets históricos se usan como fixtures de homologación/pre-lanzamiento.

Ver: `projects/pernod/README.md`

## Camino crítico actual

| Bloque | Estado | Dependencia principal |
|---|---|---|
| Parser / OCR / frozen mapping core | **Validado / congelado** | No tocar salvo evidencia nueva |
| Durable pipeline / idempotencia / replay | **Validado** | Reconciliación avanzada sigue fuera |
| Contrato app Andrés v3 | **Cerrado técnicamente** | Smoke remoto |
| LEADER + CDC dual-sale | **Implementado y validado localmente** | Smoke remoto |
| RC v3 desde C2 | **PASS local** | Quedó superado por v4 |
| Matriz María → artefacto gobernado | **PASS offline** | item_kind/runtime activation |
| Quantity architecture v4 | **Implementada localmente** | Recheck independiente |
| Campaign scope / out-of-campaign | **Implementado localmente** | Recheck + policy real |
| Price gobernado | Pendiente externo | María/Cami |
| RC nuevo v4 | Pendiente | Recheck + commit |
| Smoke LABS fractional quantity | Pendiente | RC + data + UIDs |
| UAT | Pendiente | Smoke remoto |
| Producción controlada | Pendiente | UAT |

## Avance ejecutivo

- V0 de homologación original pasó smoke real LABS.
- Contrato nuevo con Andrés migró a `uid + cdc_uid + campaign_id`.
- Andrés confirmó 2 ventas por ticket: LEADER y CDC.
- Foto queda en LEADER por ahora.
- Códigos de `products[].ref` fueron confirmados.
- C1 y C2 fueron congelados localmente, sin push.
- RC reproducible desde C2 pasó verify + E2E desde ZIP.
- Matriz de María fue fijada por SHA y convertida en artefato governado offline.
- Nueva canonical quantity: COPA=1 unit, BOTELLA=14 units.
- No hay acumulación cross-ticket.
- V4 convierte a botellas decimales sólo en la borda de retail/buy.
- Producto explícitamente fuera de campaña se excluye de la venta sin invalidar todo el ticket.
- Unknown product sigue fail-closed.
- WU v4: 930 tests, 18/18 mutantes y E2E overlay PASS.
- No hubo deploy de producción.

## Próxima secuencia

1. Recheck adversarial independiente del v4.
2. Si PASS, commit local del v4.
3. Construir RC nuevo reproducible.
4. Repetir verify + E2E desde el ZIP.
5. Activar matrix/campaign scope/price gobernados para homologación.
6. Smoke LABS con quantity fraccionaria.
7. UAT con casos representativos.
8. Producción controlada + handover.

## Pendientes externos principales

### Andrés

- UID LEADER real LABS;
- `cdc_uid` real LABS;
- campaign de homologación;
- prueba real de quantity fraccionaria y eco de invoice.

### María/Cami

- price por referencia/campaign para homologación;
- item_kind de los nombres que usemos en fixture;
- después: reglas finales de cócteles/properties/date cuando sean necesarias.

## Boundary operativo

Nuestro engine:

- conserva evidencia;
- ejecuta OCR/parser;
- normaliza;
- clasifica escopo de campaña;
- valida;
- persiste plan/basis;
- protege replay/retry;
- si corresponde, envía foto;
- registra LEADER y CDC;
- audita productos fuera de campaña.

Andrés/SuperLikers:

- challenge;
- metas;
- cálculo final de points;
- redención/recompensas.

## Reglas de seguimiento

- no marcar producción antes de smoke remoto + UAT;
- no confundir PASS local con provider real;
- no convertir una decisión temporal de policy en regla hardcoded del parser;
- mantener claro qué está commitado, qué está sólo local y qué está desplegado.

## Próxima revisión

Después del recheck independiente del v4.
