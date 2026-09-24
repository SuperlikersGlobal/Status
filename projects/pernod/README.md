# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso — V0 de homologación desplegada / smoke real LABS aprobado / prueba de Andrés pendiente  
**Fecha objetivo:** flujo operativo y seguro antes del **2026-10-01**  
**Última actualización:** 2026-09-24

## Objetivo

Construir un **Pernod Ticket Processing Engine** independiente del canal de entrada.

WhatsApp/Kapso y el app de Andrés deben poder usar el mismo núcleo para:

1. recibir la imagen;
2. preservar evidencia;
3. ejecutar OCR y parser;
4. deduplicar;
5. validar el documento;
6. decidir si puede seguir;
7. registrar en SuperLikers cuando corresponda;
8. mantener trazabilidad, retry e idempotencia.

## Boundary activo

La conversación más reciente con Andrés cambió el boundary respecto del diseño económico anterior.

El engine actual **no controla**:

- puntos;
- metas;
- challenge;
- reward_owner;
- redención;
- balances;
- crédito.

Andrés confirmó que esos elementos se manejan de su lado.

Por lo tanto:

```text
DOCUMENT_VALIDATION
≠
POINTS / CHALLENGE ELIGIBILITY
```

El subsistema económico previo se conserva, pero está fuera del flujo activo del app de Andrés.

## Arquitectura actual

```text
WhatsApp/Kapso ─┐
                ├──> Ticket Processing Engine
App Andrés ─────┘          │
                           ├── evidencia durable
                           ├── dedup
                           ├── OCR
                           ├── parser
                           ├── document validation
                           ↓
                     Validation Decision
                           │
              ┌────────────┴────────────┐
              │                         │
            VALID                 otros estados
              │                         │
      upload SuperLikers          cero upload
              │                         │
       delivery result            respuesta + motivo
```

## Contrato de validación

Estados principales:

- **VALID** → todos los gates requeridos por la policy pasaron; puede intentarse el upload;
- **NOT_VALIDATED** → falta evidencia o una regla necesaria aún no está gobernada; no se sube;
- **INVALID** → una regla gobernada con inputs gobernados falló; no se sube;
- **RETAKE_REQUIRED** → la imagen no permite validación suficiente; pedir otra foto;
- **DUPLICATE** → el documento/imagen ya fue procesado; no generar otro efecto.

Un fallo técnico no se convierte en rechazo comercial.

Validation y delivery están separados: `VALID` no significa por sí solo que SuperLikers haya aceptado el upload.

## V0 de homologación

La V0 quedó congelada y desplegada en infraestructura aislada de AWS.

Incluye:

- Lambda dedicada;
- Function URL;
- DynamoDB dedicado;
- S3 privado de evidencia;
- OCR Lambda existente;
- secrets separados;
- policy de homologación versionada;
- fixtures gobernadas sólo para probar el happy path;
- replay/idempotencia durable.

No existe deploy de producción.

## Smoke externo real

La homologación técnica pasó de punta a punta:

```text
F0779
→ OCR real
→ parser
→ 12 gates
→ VALID
→ SuperLikers LABS
→ ACCEPTED
```

Además:

- campaña LABS `3z` confirmada;
- participante de prueba aceptado por LABS;
- `credit_applied = false`;
- replay con el mismo `request_id` devolvió la misma respuesta;
- replay produjo cero segundo efecto externo;
- evidencia quedó sólo en el prefix de homologación;
- logs revisados sin exposición de secrets o payloads sensibles.

Un smoke anterior con un UID no verificado llegó a `VALID` pero el provider respondió 404. Al usar un participante de prueba conocido, LABS aceptó el upload.

## Integración con Andrés

Ya se entregó a Andrés:

- endpoint de homologación;
- colección Postman;
- environment;
- token por canal separado;
- contrato de request/response.

La integración final debe ser server-to-server desde su Lambda.

**Gate actual:** Andrés debe ejecutar la prueba desde su lado y confirmar que puede consumir el contrato.

## Reglas comerciales

### Confirmado

María/Cami confirmó:

- COPAS aplican;
- BOTELLAS aplican;
- existen cócteles;
- ticket del mes M puede enviarse durante M o hasta el día 5 de M+1 inclusive.

### Preguntas ya enviadas y pendientes

1. ¿La cantidad variable de copas cambia también la equivalencia copa→botella según referencia/cóctel, o sólo cambia la cantidad observada?
2. ¿Marca→usuario es gate antes del upload o se usa sólo después para reto/puntos?
3. ¿Cómo tratar cócteles antes de recibir el detalle final del cliente?

### Pendiente adicional para producción

- timezone oficial de la campaña;
- fuente gobernada de la fecha oficial del ticket;
- lista/participación final de referencias.

Mientras una regla necesaria no esté establecida, la policy falla cerrado con `NOT_VALIDATED`.

## CDC / doble registro

Existe evidencia documental de que un ticket puede generar actividad para:

- gerente;
- Centro de Consumo relacionado.

El Centro se resuelve por relación/tags y debe usar un participante real. No se fabrica el UID por concatenación.

Este flujo todavía debe cerrarse sobre el nuevo orden:

```text
validar
→ si VALID
→ registrar efectos necesarios
```

## Idempotencia y durable pipeline

Ya están validados:

- EvidenceStore con S3 real;
- Submission Ledger;
- DynamoDB real;
- pipeline durable/retomable;
- retry/restart;
- concurrencia;
- lost-response sin repost ciego;
- exact image dedup;
- content duplicate como sospecha no concluyente;
- effect intent antes del network call;
- replay sin segundo efecto.

La reconciliación automática de resultados `UNKNOWN` queda fuera de la V0.

## Roadmap hasta 1/10

### Ahora
- prueba de Andrés sobre el endpoint;
- esperar respuestas comerciales de María/Cami.

### Después
- policy real de producción, sin fixtures;
- cerrar CDC / doble registro;
- UAT con casos variados y adversariales;
- producción controlada;
- rollback y handover.

### 01/10
- go-live / ajuste final.

## Riesgos y pendientes

- Muchos tickets reales pueden quedar `NOT_VALIDATED` mientras las reglas comerciales definitivas no estén cerradas.
- La fecha del ticket todavía no tiene una fuente gobernada suficiente para aplicar el periodo automáticamente en producción.
- Cócteles y marca→usuario dependen de definición comercial.
- CDC/doble registro aún no está cerrado sobre validation-before-upload.
- `moderation=rejected` sigue fuera de V0.
- No se promete antifraude visual absoluto para fotos diferentes de la misma nota.

## Criterio de siguiente gate

La integración con Andrés se considera homologada cuando:

1. consume el endpoint desde su lado;
2. recibe y entiende los estados;
3. confirma el contrato de `participant_uid`, imagen y `request_id`;
4. valida que el replay no duplica efectos;
5. no requiere cambio de boundary.

Después de ese gate, el camino crítico pasa a **policy real + CDC + UAT + producción controlada**.

## Historial

Ver `updates/` para las actualizaciones fechadas.
