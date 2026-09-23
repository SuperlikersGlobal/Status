# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso — parser congelado / ledger validado en DynamoDB real / durable pipeline como camino crítico  
**Fecha objetivo:** V1 operativa y segura antes del **2026-10-01**  
**Última actualización:** 2026-09-22

## Objetivo

Construir un **Pernod Ticket Processing Engine** independiente del canal de entrada. WhatsApp/Kapso es el primer canal; el app de Andrés podrá acoplarse al mismo núcleo.

La V1 debe recibir evidencia, identificar el documento, procesar OCR/parser, aplicar elegibilidad y antifraude, proponer progreso, exigir revisión humana, registrar crédito/reversión de forma idempotente y entregar progreso a la plataforma que administra challenge y coins.

## Estado actual

### Parser

El parser está **congelado localmente** después de cerrar una variante real del Layout 2 en la que Textract fusiona contexto, item y cantidad en una sola celda.

El freeze pasó:

- Layout 1 sin regresiones;
- Layout 2 original sin regresiones;
- variante fusionada real reconocida;
- guardas de falso crédito preservadas;
- suite Python, Lambda handler y JS en verde;
- corpus histórico de 3.023 documentos: sólo el caso real esperado cambió de clasificación.

El RAW exacto del E2E que expuso esa variante sigue pendiente y será gate antes de volver a empaquetar/deployar el parser.

### Runtime de test

El ZIP reproducible anterior fue desplegado únicamente en `Pernod-kapso-ticket-test`.

Se verificó en AWS:

- runtime Python 3.13;
- handler correcto;
- smoke de autenticación y ruta;
- E2E real WhatsApp/Kapso;
- SuperLikers Labs aceptó la imagen con `distinct_id = email`.

No hubo deploy de producción.

### Submission Ledger

El Submission Ledger ya no está sólo en diseño/local.

Se implementó y validó:

- idempotencia de `submission_id`;
- claims globales de documento/contenido;
- review-first;
- crédito exactly-once;
- reversión append-only;
- kill switch;
- saldo derivable por eventos;
- soporte para 1–2 beneficiarios;
- un único `reward_owner`;
- atomicidad de crédito/reversión para todos los beneficiarios.

La semántica multi-beneficiario confirmada con Andrés es:

```text
1 documento
→ 1 autorización
→ beneficiario A recibe +N
→ beneficiario B recibe +N
→ exactamente 1 reward_owner
```

Submitter y beneficiario dejan de ser conceptos equivalentes.

### DynamoDB real

El adapter DynamoDB pasó validação local y después fue probado contra una tabla real aislada en `us-east-1`.

Resultado de la validación real:

- smoke: PASS;
- multi-beneficiario: PASS;
- concurrencia real: PASS;
- CAS/contention: PASS;
- unknown outcome en CREDIT: PASS;
- unknown outcome en REVERSAL: PASS;
- process restart: PASS;
- error mapping real: PASS;
- semantic parity real: PASS.

La batería incluyó:

- 20 callers concurrentes para create/claim/credit/reversal;
- dos documentos distintos actualizando el mismo participante;
- mismo documento por WhatsApp/app;
- tercero fuera del beneficiary set;
- 50 seeds y 2.630 comparaciones de paridad;
- reconciliación de saldos/eventos.

Después de la batería, los datos sintéticos fueron eliminados y la tabla de integración quedó vacía.

No hubo deploy ni cambio de Lambda/Kapso/SuperLikers durante esta validación.

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

La V1 será **review-first**. Ningún resultado del parser autoriza crédito por sí solo.

El engine no administra metas, rankings o coins.

## Unidad de progreso

La autoridad contable de la V1 será entera:

- **COPA = 1 progress_unit**
- **BOTELLA = 14 progress_units**

Ejemplo:

- 45 BOTELLAS + 129 COPAS = **759 progress_units**.

No se redondea por ticket. La conversión a botellas equivalentes es derivada/informativa.

## Antifraude V1

Antifraude es P0 para 1/10.

La base transaccional ya está validada:

- idempotencia por submission;
- claims globales;
- un único crédito original por documento;
- dedup entre canales;
- cross-participant control;
- concorrencia segura;
- reversal;
- review obligatoria.

El siguiente bloque integra esa base con evidencia durable:

- SHA256 de imagen;
- OCR/content fingerprint;
- imagen original;
- RAW OCR;
- parse result;
- versiones y reason codes.

Near-duplicate visual avanzado no entra en el camino crítico mientras la V1 siga review-first.

## Integración con Andrés

Regla ya confirmada:

- un mismo ticket puede sumar avance a dos personas;
- ambas reciben el mismo avance;
- sólo una queda habilitada para redención/recompensa.

Pendiente cerrar:

- `participant_id` canónico;
- cómo el app determina/entrega los dos beneficiarios;
- cómo informa el `reward_owner`;
- contrato app → engine;
- contrato engine → app;
- regla de periodo;
- allowlist elegible;
- autoridad final de puntos/recompensa;
- fecha y entorno de UAT.

Challenge, metas y coins permanecen del lado de Andrés/SuperLikers.

## Próximo bloque: durable pipeline

El camino crítico inmediato es conectar el pipeline actual al ledger y hacer que el procesamiento sea retomable:

```text
submission
→ persist image
→ claim
→ OCR
→ persist RAW OCR
→ fingerprint
→ parser
→ persist parse
→ proposal
→ PENDING_REVIEW
```

Una falla posterior no debe obligar a repetir desde cero ni duplicar efectos externos.

La evidencia pesada debe quedar fuera de DynamoDB y ser persistida en storage privado; DynamoDB mantiene refs/hashes/estado.

## Roadmap hasta 1/10

### 23–24/09
- Evidencia durable.
- Pipeline retomable.
- Validación S3 real.
- Integración de fingerprints/claims al fluxo.

### 24–26/09
- Elegibilidad versionada.
- Review operacional.
- Cerrar contrato con Andrés.
- Integración app ↔ engine.

### 27/09
- Pruebas adversariales cross-channel y antifraude.

### 28–29/09
- UAT con casos reales:
  - Layout 1;
  - Layout 2;
  - otros formatos;
  - duplicatas/re-encode;
  - retry;
  - concurrencia;
  - multi-beneficiario;
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

- Evidencia durable/S3.
- Elegibilidad inicial aprobada.
- Identidad canónica del participante.
- Fuente de los dos beneficiarios y reward owner.
- Revisores nombrados y flujo de decisión.
- Contrato real con Andrés.
- Canal/credenciales de producción.
- Política de periodo para documentos tardíos.
- Gate remoto del RAW exacto antes del próximo redeploy del parser.

## Riesgos conocidos

- Existe un caso sintético en que una tabla de precios puede ser estructuralmente indistinguible del Layout 2. En la V1 review-first esto no autoriza crédito automático.
- El flujo actual de SuperLikers ocurre antes del OCR; una falla posterior puede encontrar duplicate 177 en retry. El durable pipeline debe desacoplar/registrar ese efecto.
- El ZIP actualmente desplegado en test corresponde al checkpoint anterior; el parser congelado más nuevo todavía no fue redeployado.
- El RAW exacto del E2E que expuso la variante fusionada sigue pendiente.

## Criterio de finalización V1

Pernod se considera listo para 1/10 cuando:

1. la misma submission/documento no puede producir dos créditos;
2. evidencia y decisiones son auditables y recuperables;
3. antifraude mínimo opera entre canales y participantes;
4. sólo productos elegibles generan propuesta;
5. COPA/BOTELLA se convierten a progress_units sin redondeo por ticket;
6. todo CREDIT tiene review registrada;
7. dos beneficiarios reciben el progreso de forma atómica cuando corresponde;
8. existe exactamente un reward owner;
9. REVERSAL es posible sin editar histórico;
10. integración real con Andrés está validada;
11. UAT adversarial pasó;
12. producción, kill switch, rollback y reconciliación están comprobados.

## Siguiente paso

**INTEGRATE_DURABLE_EVIDENCE_AND_PIPELINE_WITH_LEDGER**.

## Historial

Ver `updates/` para las actualizaciones fechadas.
