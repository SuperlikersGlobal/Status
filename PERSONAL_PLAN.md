# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Branch:** `bruno`  
**Periodo del plan:** 2026-09-17 → 2026-10-17  
**Última actualización:** 2026-09-22

## Prioridad actual

### 1. Pernod

**Meta:** Llegar a una V1 operativa y segura antes del **2026-10-01**. La fecha se considera fija; si hace falta, se reduce alcance, no seguridad.

**Estado actual:** En progreso. El parser quedó congelado localmente después de cerrar la variante real de OCR con celdas fusionadas y pasar las regresiones del corpus. El flujo de test WhatsApp/Kapso → Lambda → Textract → parser → SuperLikers Labs ya fue validado de punta a punta. El parser deja de ser el camino crítico; el foco pasa a **Submission Ledger, antifraude, idempotencia, revisión y contrato con Andrés**.

**Estrategia V1:** `review-first`. El engine propone el progreso y aplica antifraude; un revisor autoriza el crédito. Challenge, metas y coins quedan fuera del engine y pertenecen a la plataforma de Andrés/SuperLikers.

**Criterio de éxito:** El flujo debe quedar operable de punta a punta con identidad de submission/documento, evidencia durable, deduplicación entre canales, elegibilidad, conversión `COPA=1 unit / BOTELLA=14 units`, revisión, crédito exactamente una vez, reversión, integración real con Andrés, UAT, rollback y producción controlada.

Ver: `projects/pernod/README.md`

## Camino crítico hasta 1/10

| Bloque | Estado | Dependencia principal |
|---|---|---|
| Freeze del parser | **Cerrado localmente** | Gate remoto del RAW exacto sigue pendiente antes de redeploy |
| Contrato con Andrés + reglas comerciales | **Inmediato** | Identidad, periodo, elegibilidad y autoridad de crédito |
| Submission Ledger | **Siguiente bloque técnico** | Persistencia y transacciones |
| Antifraude + claims + evidencia | Pendiente | Ledger |
| Review + crédito/reversión | Pendiente | Ledger + revisores |
| Integración real con Andrés | Pendiente | Contrato aceptado |
| UAT adversarial | Pendiente | Flujo completo en test |
| Producción controlada | Pendiente | UAT + rollback + aprobación |

## Enfoque hasta el go-live

| Periodo | Foco | Estado |
|---|---|---|
| 22 sep | Freeze parser + contrato/decisiones externas | En progreso |
| 23–25 sep | Submission Ledger + antifraude + evidencia | Pendiente |
| 25–27 sep | Review, elegibilidad, crédito/reversión e integración | Pendiente |
| 28–29 sep | UAT real y adversarial | Pendiente |
| 30 sep | Producción controlada, rollback y reconciliación | Pendiente |
| 1 oct | Go-live controlado, review-first | Objetivo |
| Octubre en adelante | Human | Por definir |
| Octubre en adelante | MyDesk | Por definir |

## Avance ejecutivo

- Flujo real de WhatsApp/Kapso, Lambda, OCR y SuperLikers Labs validado.
- Parser congelado localmente con soporte para Layout 1, Layout 2 de 3 celdas y variante real de Layout 2 con contexto/item fusionados.
- Suite completa y corpus histórico sin regresiones inesperadas; sólo el caso real esperado cambió de clasificación.
- Master auditado contra 3.023 OCRs históricos y limpiado únicamente con cambios seguros.
- Guardas contra falso crédito implementadas.
- E2E remoto reveló una variante OCR que ahora está corregida localmente; el RAW exacto de esa ejecución sigue como gate antes de un nuevo deploy.
- Análisis histórico confirmó que deduplicar sólo por archivo no es suficiente; antifraude e idempotencia pasan a ser P0.
- Arquitectura de V1 redefinida como **Ticket Engine channel-independent**: WhatsApp es un canal; el app de Andrés podrá usar el mismo núcleo.
- No se ha realizado release de producción con este estado.

## Pendientes principales

- Cerrar contrato con Andrés: `participant_id`, modo de integración, periodo y comportamiento de reversión.
- Definir allowlist inicial de productos/referencias elegibles.
- Implementar Submission Ledger con idempotencia y concurrencia seguras.
- Persistir evidencia de submission/documento y fingerprints antifraude.
- Implementar revisión, crédito y reversal auditables.
- Confirmar autoridad única de crédito para evitar doble contabilización.
- UAT real, producción controlada, rollback y handover.

## Reglas de seguimiento

Este archivo es la vista ejecutiva para liderazgo.

Para cada proyecto activo:

- actualizar el README del proyecto cuando cambie su estado;
- registrar avances relevantes en `projects/<proyecto>/updates/`;
- mantener bloqueos y pendientes explícitos;
- no marcar una meta como completada hasta cumplir realmente su criterio de éxito.

## Próxima revisión

Revisar el resultado del primer bloque del Submission Ledger y el cierre del contrato con Andrés.
