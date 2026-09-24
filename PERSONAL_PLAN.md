# Bruno — Plan de acción personal

**Responsable:** Bruno Antoniassi  
**Branch:** `bruno`  
**Periodo del plan:** 2026-09-17 → 2026-10-17  
**Última actualización:** 2026-09-24

## Prioridad actual

### 1. Pernod

**Meta:** dejar el flujo operativo y seguro antes del **2026-10-01**. La fecha sigue fija; si hace falta, se reduce alcance, no seguridad.

**Estado actual:** En progreso. La V0 de homologación validation-before-upload está desplegada en AWS y pasó un smoke real de punta a punta con OCR en vivo, `VALID`, upload `ACCEPTED` en SuperLikers LABS y replay sin segundo efecto. El endpoint y Postman ya fueron enviados a Andrés con el token por separado.

**Gate actual:** prueba de integración de Andrés.

**Cambio importante de boundary:** el engine ya no controla puntos, metas, challenge, reward_owner, redención, balances ni crédito para el flujo de Andrés. Su responsabilidad activa es validar el documento y registrar en SuperLikers sólo cuando la policy lo permite.

Ver: `projects/pernod/README.md`

## Camino crítico hasta 1/10

| Bloque | Estado | Dependencia principal |
|---|---|---|
| Parser / OCR / mapping | **Validado** | Mantener congelado salvo evidencia nueva |
| Evidencia durable + pipeline retomable | **Validado** | Operación/UAT |
| Idempotencia / dedup / replay | **Validado** | Reconciliación avanzada queda fuera de V0 |
| V0 validation-before-upload | **Homologada técnicamente** | Prueba de Andrés |
| Integración con Andrés | **En progreso** | Andrés debe consumir el endpoint |
| Reglas comerciales María/Cami | **Pendiente de respuesta** | Copas, marca→usuario, cócteles |
| Policy real de producción | Pendiente | Reglas comerciales + periodo |
| CDC / doble registro | Pendiente | Cerrar sobre validation-before-upload |
| UAT adversarial | Pendiente | Policy real + integración |
| Producción controlada | Pendiente | UAT + rollback + aprobación |

## Enfoque hasta el go-live

| Periodo | Foco | Estado |
|---|---|---|
| 24 sep | Cerrar homologación técnica + handoff Andrés | **Completado de nuestro lado** |
| 24–26 sep | Prueba Andrés + reglas comerciales + policy real | En progreso / pendiente externo |
| 26–28 sep | CDC + UAT + correcciones | Pendiente |
| 29–30 sep | Producción controlada + rollback + handover | Pendiente |
| 01 oct | Go-live / ajuste final | Objetivo |
| Octubre en adelante | Human | Por definir |
| Octubre en adelante | MyDesk | Por definir |

## Avance ejecutivo

- V0 de homologación congelada y desplegada en infraestructura aislada.
- OCR real, parser/master y validación ejecutados en runtime de AWS.
- Smoke externo real pasó `VALID → ACCEPTED` en SuperLikers LABS campaña `3z`.
- Replay del mismo request produjo cero segundo efecto externo.
- EvidenceStore/S3, DynamoDB, receipts e idempotencia durable validados.
- Logs de homologación revisados sin exposición de API key, token, imagen base64, environment completo o provider raw.
- Policy temporal de update usada durante homologación fue revocada.
- Endpoint, Postman/environment e instrucciones ya enviados a Andrés; token entregado por separado.
- `participant_uid` se trata como UID opaco; un participante de prueba conocido fue aceptado por LABS.
- `credit_applied = false`: el endpoint no aplica puntos/crédito.
- No hubo deploy de producción.

## Boundary actual confirmado

Nuestro engine:

- recibe/preserva evidencia;
- ejecuta OCR/parser;
- deduplica;
- valida el documento;
- persiste decisión;
- si `VALID`, intenta registrar en SuperLikers;
- persiste resultado de delivery;
- protege retry/replay contra duplicación.

Andrés/SuperLikers:

- puntos;
- metas;
- challenge;
- reward/redención.

## Pendientes principales

### Andrés

- ejecutar la prueba con Postman/Lambda;
- confirmar que consume el contrato sin cambio de boundary;
- validar comportamiento de estados y replay.

### María/Cami

Ya preguntado y pendiente:

- si la variación de copas cambia equivalencia o sólo cantidad;
- si marca→usuario es gate previo o sólo cálculo posterior;
- cómo tratar cócteles antes del detalle final.

Después, si sigue sin respuesta:

- timezone oficial;
- fuente gobernada de la fecha del ticket.

### Producción

- convertir policy de homologación en policy real sin fixtures;
- cerrar CDC/doble registro;
- UAT variado/adversarial;
- producción controlada;
- rollback;
- handover.

## Reglas de seguimiento

Este archivo es la vista ejecutiva para liderazgo.

Para cada proyecto activo:

- actualizar el README cuando cambie el estado;
- registrar avances relevantes en `projects/<proyecto>/updates/`;
- mantener bloqueos y pendientes explícitos;
- no convertir una prueba o intención en resultado de producción;
- no marcar go-live como completado antes de UAT y producción controlada.

## Próxima revisión

Revisar el resultado de la prueba de Andrés y las respuestas de María/Cami. Si Andrés no requiere cambio de boundary, avanzar directamente a policy real + CDC + UAT.
