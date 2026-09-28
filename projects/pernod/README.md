# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso — contrato v3 y dual-sale cerrados / v4 fractional quantity en recheck / nuevo RC pendiente  
**Objetivo interno:** flujo de homologación seguro y listo para UAT  
**Última actualización:** 2026-09-28

## Objetivo

Construir un **Pernod Ticket Processing Engine** independiente del canal de entrada.

WhatsApp/Kapso y el app de Andrés consumen el mismo núcleo para:

1. recibir la imagen;
2. preservar evidencia;
3. ejecutar OCR y parser;
4. deduplicar;
5. normalizar productos;
6. aplicar reglas gobernadas de campaña;
7. decidir si el ticket puede registrar;
8. si corresponde, registrar foto + ventas en SuperLikers;
9. mantener trazabilidad, replay, retry e idempotencia.

## Boundary activo

El engine no es dueño de:

- metas;
- challenge;
- reward/redención;
- balances finales;
- reglas de campaña que aún no hayan sido gobernadas.

Su responsabilidad activa es convertir evidencia de ticket en una decisión auditable y, cuando todos los gates pasan, ejecutar efectos idempotentes en SuperLikers.

## Contrato v3 con Andrés

Request:

- `request_id`;
- `uid` = líder;
- `cdc_uid` = Centro de Consumo;
- `campaign_id`;
- `image`;
- `client_submitted_at` opcional.

Flujo de efectos confirmado:

```text
VALID
→ foto al LEADER
→ retail/buy LEADER
→ retail/buy CDC
```

LEADER:

- `distinct_id = uid`;
- invoice ref base.

CDC:

- `distinct_id = cdc_uid`;
- invoice ref base + `-cdc`.

Ambos reciben la misma campaign y los mismos products.

Andrés confirmó que `products[].ref` usa los códigos internos Pernod y que `campaign_id` debe venir del caller.

## Checkpoints de código

### C1

Commit local:

`b676e90...`

Incluye:

- public contract v3;
- dual recipient;
- photo role LEADER;
- execution basis inmutable;
- price table por campaign;
- product normalization interface;
- legacy/replay protections.

### C2

Commit local:

`2d36f48...`

Incluye hardening de:

- execution basis missing;
- policy races;
- sequencing LEADER → CDC;
- pre-intent safety;
- normalización fail-closed.

Los commits siguen locales y no fueron pushados.

## RC v3 local

Se construyó un RC reproducible desde C2.

Confirmado:

- dos builds byte-idénticos;
- 25 módulos runtime;
- frozen guards;
- verify independiente;
- E2E desde ZIP extraído;
- 1 foto + 1 LEADER + 1 CDC;
- replay 0/0/0;
- restart, concurrency y partial failure;
- legacy replay;
- secret scan;
- Postman v3.

El RC deberá reconstruirse porque el v4 actual cambia quantity policy y campaign scope.

## Matriz de María

Fuente exacta fijada por SHA:

`d74130f40affc401dd3b61af8b5a59f8e3068e9a7fc39321276e6b9c649f3309`

Artefacto offline:

- 2.580 filas;
- 1.787 direct/high;
- 1.681 lookup keys;
- 106 redundancias colapsadas;
- 793 exclusiones;
- 0 colisiones elegibles.

La matriz resuelve identidad de producto, pero `item_kind` real todavía debe ser gobernado antes de activar el runtime.

## Quantity architecture

Representación canónica interna:

- COPA = 1 copa_unit;
- BOTELLA = 14 copa_units.

Se agrega por referencia dentro del ticket.

No se acumulan copas entre tickets.

Policy propuesta default:

`pernod-copa-fraction@1`

En la borda de `retail/buy`:

```text
quantity = copa_units / 14
```

a 6 decimales.

Ejemplos:

- 2 COPAS → 0.142857;
- 14 COPAS → 1;
- 15 COPAS → 1.071429;
- 2 BOTELLAS + 9 COPAS → 2.642857.

La policy queda versionada para poder cambiarla sin rediseñar parser, ledger o efectos.

## Producto fuera de campaña

Regla nueva:

- clasificación fuera de campaña debe ser positiva y gobernada;
- una línea explícitamente OUT no invalida el ticket;
- no entra en `products[]`;
- no exige price;
- queda visible para auditoría.

Un nombre desconocido no se descarta: sigue `MAPPING_UNRESOLVED` fail-closed.

## V4 local pendiente de freeze

El WU v4 está implementado pero no commitado.

Resultado local:

- FULL 930;
- 2 xfails conocidos;
- 0 fallos reales;
- 18/18 mutantes dirigidos muertos;
- E2E overlay 101/101.

Incluye:

- `sale-plan-v4`;
- evaluator v0.5;
- `SaleAmount` en copa units;
- quantity fraccionaria;
- campaign scope;
- out-of-campaign;
- warning scoping;
- echo detection para quantity drift;
- compatibilidad v3.

## Gate actual

**Recheck independiente del v4.**

Si pasa:

1. commit local del v4;
2. construir RC nuevo;
3. verificar el nuevo ZIP;
4. empaquetar datos gobernados de matrix/scope/price;
5. smoke LABS controlado;
6. UAT;
7. producción controlada.

## Inputs externos todavía necesarios

### Andrés

- UIDs LEADER y CDC reales en LABS para fixture;
- campaign de prueba;
- smoke real de `retail/buy` con quantity fraccionaria;
- confirmar comportamiento del eco/puntos.

### María/Cami

- price gobernado para homologación/producción;
- confirmaciones de `item_kind` de los nombres que usemos en fixture;
- después: cócteles, properties y reglas finales que correspondan.

## Riesgos abiertos

- quantity fraccionaria todavía no fue verificada en LABS;
- matrix real aún no está activada como policy runtime;
- price real todavía no está configurado;
- outcomes UNKNOWN siguen requiriendo reconciliación manual en homologación;
- nuevo RC todavía no existe para v4.

## Campaña

La campaña aún no ha iniciado. Los tickets históricos que usamos ahora son fixtures de homologación/pre-lanzamiento; no representan una ventana activa de campaña.

## Historial

Ver `updates/`, especialmente `updates/2026-09-28.md`, para la evidencia cronológica más reciente.
