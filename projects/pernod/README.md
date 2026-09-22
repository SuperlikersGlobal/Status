# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso — parser congelado localmente / Submission Ledger como camino crítico  
**Fecha objetivo:** V1 operativa y segura antes del **2026-10-01**  
**Última actualización:** 2026-09-22

## Objetivo

Construir un **Pernod Ticket Processing Engine** independiente del canal de entrada. WhatsApp/Kapso es el primer canal; el app de Andrés podrá acoplarse al mismo núcleo.

La V1 debe recibir evidencia, identificar el documento, procesar OCR/parser, aplicar elegibilidad y antifraude, proponer progreso, exigir revisión humana, registrar crédito/reversión de forma idempotente y entregar progreso a la plataforma que administra challenge y coins.

## Estado actual

### Parser

El parser quedó **congelado localmente** en un nuevo checkpoint después de cerrar una variante real del Layout 2 en la que Textract fusiona contexto, item y cantidad en una sola celda.

El freeze local pasó:

- Layout 1 sin regresiones;
- Layout 2 original sin regresiones;
- variante fusionada real reconocida;
- guardas de falso crédito preservadas;
- suite Python, Lambda handler y JS en verde;
- corpus histórico de 3.023 documentos: sólo el caso real esperado cambió de clasificación.

El E2E remoto previo había expuesto precisamente esta variante. El RAW exacto de esa ejecución sigue pendiente y será gate antes de volver a empaquetar/deployar el parser.

### Runtime de test

El ZIP reproducible anterior fue desplegado únicamente en `Pernod-kapso-ticket-test`.

Se verificó en AWS:

- runtime Python 3.13;
- handler correcto;
- código congelado recibido por la Lambda;
- smoke sin token → 401;
- smoke autenticado → ruta y parsing correctos;
- E2E real WhatsApp/Kapso completado.

No hubo deploy de producción.

### Cambio de prioridad

El parser deja de ser el principal riesgo del proyecto. El camino crítico pasa a:

1. contrato e identidad con Andrés;
2. Submission Ledger;
3. antifraude y deduplicación;
4. review y crédito/reversión;
5. elegibilidad;
6. integración real;
7. UAT;
8. producción controlada.

La V1 será **review-first**: ningún resultado del parser autoriza crédito por sí solo.

## Arquitectura V1

```text
WhatsApp/Kapso ─┐
                ├──> Ticket / Submission Engine
App Andrés ─────┘          │
                           ├── evidencia durable
                           ├── dedup / antifraude
                           ├── OCR
                           ├── parser
                           ├── elegibilidad
                           ├── propuesta en progress_units
                           ├── revisión humana
                           ↓
                    Submission Ledger
                           │
                    CREDIT / REVERSAL
                           ↓
                         Andrés
                           ↓
                   Challenge / Coins
```

El engine no necesita administrar metas, rankings o coins.

## Unidad de progreso

La autoridad contable de la V1 será entera:

- **COPA = 1 progress_unit**
- **BOTELLA = 14 progress_units**

Ejemplo:

- 45 BOTELLAS + 129 COPAS = **759 progress_units**.

No se redondea por ticket. La conversión a “botellas equivalentes” es derivada/informativa, no la unidad primaria del ledger.

## Antifraude V1

Antifraude es P0 para 1/10.

El mínimo previsto incluye:

- idempotencia por submission;
- SHA256 global de la imagen;
- fingerprint de contenido OCR;
- claims globales entre canales y participantes;
- bloqueo de segundo crédito para el mismo documento;
- carga/consulta de evidencia histórica cuando aplique;
- plausibilidad y reason codes;
- revisión humana obligatoria antes de CREDIT;
- transacción atómica para evitar carreras entre WhatsApp/app/retries.

El corpus histórico confirmó que deduplicar sólo por bytes no alcanza: existen reenvíos del mismo contenido en archivos distintos.

Near-duplicate visual avanzado no entra en el camino crítico de la V1 mientras el lanzamiento siga review-first.

## Submission Ledger

El siguiente bloque técnico implementa una única frontera de consistencia para:

- `submission_id`;
- `document_id`;
- claims de imagen/contenido;
- estado de procesamiento;
- revisión;
- CREDIT exactamente una vez;
- REVERSAL append-only;
- saldo/progreso derivable;
- audit trail.

Principios:

- retry no crea otra submission;
- misma submission con contenido distinto es conflicto;
- mismo documento no puede generar dos créditos originales;
- PENDING_REVIEW y REJECTED no alteran progreso;
- CREDIT exige revisión;
- REVERSAL no edita el histórico;
- WhatsApp y app comparten el mismo dominio de dedup.

## Integración con Andrés

El app de Andrés es un canal/consumidor, no parte del parser.

Pendiente cerrar:

- `participant_id` canónico;
- vínculo email/WhatsApp/app;
- periodo comercial;
- allowlist elegible;
- autoridad única de crédito;
- modo de integración: snapshot versionado o feed de eventos;
- comportamiento de reversal/reducción de progreso;
- fecha y entorno de UAT real.

Challenge, metas y coins permanecen del lado de Andrés/SuperLikers.

## Avances confirmados

- WhatsApp/Kapso recibe email e imagen y ejecuta el flujo real.
- SuperLikers Labs acepta la evidencia y usa email como `distinct_id`.
- AWS Textract integrado con documentos reales.
- Parser soporta:
  - matriz por sucursales con TOTAL;
  - formato largo de 3 celdas;
  - variante real con contexto/item fusionados.
- Normalización de `BOT/BOT.` → `BOTELLA` y `COP/CP/COPA` → `COPA`.
- Regla comercial confirmada: **14 copas = 1 botella**.
- Ambigüedad permanece fail-closed / `NEEDS_REVIEW`.
- Guardas contra números de SKU/nombre interpretados como cantidad.
- Master auditado contra 3.023 OCRs históricos, con 73 aliases contaminados removidos de forma segura.
- Tablas contextuales/review no contaminan totales directos.
- Layout 1: BOTELLA 45, COPA 129, 759 progress_units observadas.
- Layout 2: 31 cantidades conocidas, 1 cantidad nula preservada para revisión.

## Roadmap hasta 1/10

### 22/09
- Freeze/checkpoint del parser.
- Cerrar decisiones de arquitectura y contrato con Andrés.

### 23–25/09
- Submission Ledger.
- Persistencia de evidencia.
- Idempotencia y claims.
- Antifraude V1.

### 25–27/09
- Revisión operativa.
- Crédito/reversión atómicos.
- Elegibilidad versionada.
- Integración con Andrés.

### 28–29/09
- UAT con casos reales y adversariales:
  - duplicata;
  - re-encode;
  - cross-user;
  - retry;
  - concurrencia;
  - reversal;
  - producto no elegible.

### 30/09
- Producción controlada.
- Reconciliación.
- Kill switch.
- Rollback.
- Runbook.

### 01/10
- Go-live controlado, review-first.

## Dependencias y pendientes

- Elegibilidad inicial aprobada.
- Identidad canónica del participante.
- Autoridad única de crédito.
- Revisores nombrados y flujo de decisión.
- Contrato real con Andrés.
- Canal/credenciales de producción.
- Política de periodo para documentos tardíos.
- Gate remoto del RAW exacto antes del próximo redeploy del parser.

## Riesgos conocidos

- Existe un caso sintético en que una tabla de precios puede ser estructuralmente indistinguible del Layout 2. En la V1 review-first esto no autoriza crédito automático.
- El upload a SuperLikers ocurre antes del OCR en el flujo actual; una falla posterior puede encontrar duplicata en retry. El nuevo estado durável debe permitir retomar por etapa o desacoplar ese efecto.
- El ZIP actualmente desplegado en test corresponde al checkpoint anterior; el nuevo parser congelado todavía no fue redeployado.
- El RAW exacto del E2E que expuso la variante fusionada sigue pendiente.

## Criterio de finalización V1

Pernod se considera listo para el alcance de 1/10 cuando:

1. la misma submission/documento no puede producir dos créditos;
2. evidencia y decisiones son auditables;
3. antifraude mínimo opera entre canales y participantes;
4. sólo productos elegibles generan propuesta;
5. COPA/BOTELLA se convierten a progress_units sin redondeo por ticket;
6. todo CREDIT tiene revisión registrada;
7. REVERSAL es posible sin editar histórico;
8. integración real con Andrés está validada;
9. UAT adversarial pasó;
10. producción, kill switch, rollback y reconciliación están comprobados.

## Siguiente paso

**START_SUBMISSION_LEDGER**.

El parser queda fuera del camino crítico salvo bug de seguridad o gate necesario para el próximo redeploy.

## Historial

Ver `updates/` para las actualizaciones fechadas.
