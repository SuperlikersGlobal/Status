# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Branch:** `bruno`  
**Periodo del plan:** 2026-09-17 → 2026-10-17  
**Última actualización:** 2026-09-22

## Prioridad actual

### 1. Pernod

**Meta:** Llegar a una V1 operativa y segura antes del **2026-10-01**. La fecha se considera fija; si hace falta, se reduce alcance, no seguridad.

**Estado actual:** En progreso. El parser está congelado localmente y el **Submission Ledger ya fue validado contra DynamoDB real** en AWS con concurrencia, retries, restart, reversión y soporte multi-beneficiario. El camino crítico pasa ahora a **evidencia durable + pipeline retomable**, elegibilidad, review operativo e integración real con Andrés.

**Estrategia V1:** `review-first`. El engine propone el progreso y aplica antifraude; un revisor autoriza el crédito. Challenge, metas y coins quedan fuera del engine y pertenecen a la plataforma de Andrés/SuperLikers.

**Criterio de éxito:** El flujo debe quedar operable de punta a punta con identidad de submission/documento, evidencia durable, deduplicación entre canales, elegibilidad, conversión `COPA=1 unit / BOTELLA=14 units`, revisión, crédito exactamente una vez, reversión, integración real con Andrés, UAT, rollback y producción controlada.

Ver: `projects/pernod/README.md`

## Camino crítico hasta 1/10

| Bloque | Estado | Dependencia principal |
|---|---|---|
| Freeze del parser | **Cerrado localmente** | Gate remoto del RAW exacto sigue pendiente antes de redeploy |
| Submission Ledger | **Validado localmente y en DynamoDB real** | Integración al pipeline |
| Multi-beneficiario | **Validado** | Regla de identificación con Andrés |
| Antifraude transaccional / dedup | **Base validada** | Evidencia durable + pipeline |
| Evidencia durable + pipeline retomable | **Siguiente bloque técnico** | S3 / integración por etapas |
| Elegibilidad | Pendiente | Allowlist/regla comercial |
| Review + crédito/reversión | Ledger listo; operación pendiente | Revisores + flujo operativo |
| Integración real con Andrés | Pendiente | Contrato app ↔ engine |
| UAT adversarial | Pendiente | Flujo completo en test |
| Producción controlada | Pendiente | UAT + rollback + aprobación |

## Enfoque hasta el go-live

| Periodo | Foco | Estado |
|---|---|---|
| 22 sep | Freeze parser + ledger + DynamoDB real | **Avance principal completado** |
| 23–24 sep | Evidencia durable + pipeline retomable + antifraude integrado | Siguiente |
| 24–26 sep | Elegibilidad + review + integración con Andrés | Pendiente |
| 27 sep | Pruebas adversariales cross-channel | Pendiente |
| 28–29 sep | UAT real | Pendiente |
| 30 sep | Producción controlada, rollback y reconciliación | Pendiente |
| 1 oct | Go-live controlado, review-first | Objetivo |
| Octubre en adelante | Human | Por definir |
| Octubre en adelante | MyDesk | Por definir |

## Avance ejecutivo

- Flujo real de WhatsApp/Kapso, Lambda, OCR y SuperLikers Labs validado.
- Parser congelado localmente con soporte para Layout 1, Layout 2 de 3 celdas y variante real con contexto/item fusionados.
- Submission Ledger implementado con idempotencia, claims, review-first, crédito exactly-once, reversión append-only y kill switch.
- Adapter DynamoDB validado localmente y luego contra **DynamoDB real** en AWS.
- Validación real incluyó concurrencia de 20 callers, CAS/contention, unknown outcome, process restart, reversión y paridad semántica.
- Regla confirmada con Andrés: un mismo ticket puede generar progreso para **dos beneficiarios**, con un único `reward_owner`.
- Ledger multi-beneficiario validado atomicamente: ambos reciben el progreso o ninguno recibe.
- Contabilidad interna definida en enteros: `COPA=1 progress_unit`, `BOTELLA=14 progress_units`.
- Antifraude e idempotencia siguen como P0; el documento es único aunque aparezca por WhatsApp o app.
- Arquitetura V1 permanece channel-independent: WhatsApp es un canal; el app de Andrés usará el mismo núcleo.
- No se ha realizado release de producción con este estado.

## Pendientes principales

- Integrar evidencia durable y el pipeline retomable con el ledger.
- Validar S3 real para imagen, OCR bruto y parse.
- Cerrar con Andrés: `participant_id`, origen de los dos beneficiarios, `reward_owner`, contrato app ↔ engine y tratamiento de reversal.
- Definir allowlist inicial de productos/referencias elegibles y regla de periodo.
- Implementar el flujo operacional de review.
- Ejecutar UAT real y adversarial.
- Preparar producción, kill switch, rollback, reconciliación y handover.

## Reglas de seguimiento

Este archivo es la vista ejecutiva para liderazgo.

Para cada proyecto activo:

- actualizar el README del proyecto cuando cambie su estado;
- registrar avances relevantes en `projects/<proyecto>/updates/`;
- mantener bloqueos y pendientes explícitos;
- no marcar una meta como completada hasta cumplir realmente su criterio de éxito.

## Próxima revisión

Revisar el resultado de la integración de evidencia durable/pipeline y el cierre del contrato con Andrés.
