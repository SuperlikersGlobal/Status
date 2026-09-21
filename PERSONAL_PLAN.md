# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Branch:** `bruno`  
**Periodo del plan:** 2026-09-17 → 2026-10-17  
**Última actualización:** 2026-09-21

## Prioridad actual

### 1. Pernod

**Meta:** Finalizar el trabajo de Pernod antes del **2026-10-01**.

**Estado actual:** En progreso. La capa de lectura del ticket está en freeze final. El flujo WhatsApp/Kapso → OCR → parser → SuperLikers Labs ya fue validado con tickets reales y dos estructuras distintas. El siguiente gate es cerrar la auditoría final del parser, generar el paquete reproducible y repetir el E2E remoto antes de avanzar a elegibilidad e integración con Andrés.

**Criterio de éxito:** El flujo debe quedar implementado, validado y operable de punta a punta: lectura, elegibilidad, avance en botellas, acumulación, idempotencia mínima, UAT, producción controlada y handover.

Ver: `projects/pernod/README.md`

## Enfoque de los próximos 30 días

| Periodo | Foco | Estado |
|---|---|---|
| 21–22 sep | Freeze final del parser + E2E remoto | En progreso |
| 22–25 sep | Elegibilidad + integración con Andrés + acumulación/idempotencia | Pendiente |
| 26–28 sep | UAT con tickets variados | Pendiente |
| 29 sep → 1 oct | Producción controlada + handover + go-live | Pendiente |
| Octubre en adelante | Human | Por definir |
| Octubre en adelante | MyDesk | Por definir |

## Avance ejecutivo

- Flujo real de WhatsApp/Kapso y SuperLikers Labs validado.
- OCR y parser soportan dos layouts reales.
- Master auditado contra 3.023 OCRs históricos y limpiado únicamente con cambios seguros.
- Guardas contra falso crédito implementadas.
- Semántica de cantidades, ceros, desconocidos y tablas de review auditada.
- Replays reales de Layout 1 y Layout 2 aprobados localmente.
- No se ha realizado release de producción con el estado actual.

## Pendientes principales

- Freeze audit final del parser y nuevo E2E remoto.
- Elegibilidad de referencias/marcas.
- Contrato de integración con Andrés para avance en botellas.
- Acumulación entre tickets.
- Idempotencia mínima.
- UAT, producción controlada y handover.

## Reglas de seguimiento

Este archivo es la vista ejecutiva para liderazgo.

Para cada proyecto activo:

- actualizar el README del proyecto cuando cambie su estado;
- registrar avances relevantes en `projects/<proyecto>/updates/`;
- mantener bloqueos y pendientes explícitos;
- no marcar una meta como completada hasta cumplir realmente su criterio de éxito.

## Próxima revisión

Revisar el resultado del freeze/E2E remoto y el inicio de elegibilidad + integración con Andrés.
