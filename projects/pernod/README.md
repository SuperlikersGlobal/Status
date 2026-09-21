# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso — parser en freeze final / preparación de release de prueba  
**Fecha objetivo:** Finalizar el alcance actual antes del **2026-10-01**  
**Última actualización:** 2026-09-21

## Objetivo

Completar el alcance actual de Pernod con un flujo operativo validado de punta a punta: recepción de evidencia por WhatsApp, lectura y normalización del ticket, identificación de productos/cantidades, cálculo del avance elegible y entrega del resultado al flujo de SuperLikers.

## Estado actual

La capa de lectura y normalización está en su etapa final de validación.

Ya existe un flujo E2E funcional entre **WhatsApp/Kapso → Lambda → Textract → parser → SuperLikers Labs**. Se probaron tickets reales con estructuras diferentes y el parser ya reconoce dos formatos reales sin depender de un único layout.

El trabajo actual es cerrar el **freeze audit del parser**, generar un paquete reproducible y volver a ejecutar un E2E remoto antes de avanzar a elegibilidad e integración final con Andrés.

## Velocidad de avance esperada

La velocidad técnica actual es alta porque la mayor parte de la incertidumbre del parser ya fue reducida. A partir de este punto, el ritmo depende menos de investigación abierta y más de cerrar gates concretos.

**Estimación operativa si no aparecen bloqueos externos nuevos:**

| Bloque | Tiempo estimado | Dependencia principal |
|---|---:|---|
| Freeze final del parser + paquete reproducible | **~1 día de trabajo** | Que el freeze audit no detecte un blocker funcional |
| Deploy en Lambda test + nuevo E2E WhatsApp | **mismo día / siguiente día** | Acceso al entorno de test |
| Elegibilidad + contrato de avance en botellas | **1–2 días** | Confirmación funcional con Andrés |
| Acumulación + idempotencia mínima | **1–2 días** | Definir dónde se mantiene el estado acumulado |
| UAT multiformato + correcciones | **2–3 días** | Disponibilidad de tickets representativos |
| Producción controlada + rollback + handover | **1–2 días** | Aprobación para pasar a producción |

Esto no es una promesa de duración fija: los bloques técnicos propios pueden avanzar rápido, pero las etapas que dependen de una definición o validación externa pueden mover el calendario.

### Qué puede avanzar sin esperar a terceros

- freeze audit;
- manifest y empaquetado;
- regresiones locales;
- Lambda de test;
- pruebas de parser;
- preparación de UAT;
- documentación técnica y rollback.

### Qué puede limitar la velocidad

- definición de qué referencias/marcas son elegibles;
- confirmación con Andrés del contrato exacto de integración;
- definición de dónde acumular múltiples tickets;
- disponibilidad de casos reales para UAT;
- aprobación para producción.

## Avances confirmados

- Integración de WhatsApp/Kapso funcionando con carga real de imágenes.
- Upload a SuperLikers Labs validado con respuesta exitosa.
- Identificación del participante por email validada en el flujo real.
- OCR con AWS Textract validado con documentos reales.
- Soporte para dos layouts reales:
  - matriz por sucursales con columna TOTAL;
  - formato largo sin header con sucursal, producto base e item vendido.
- Normalización de presentaciones:
  - `BOT / BOT.` → `BOTELLA`;
  - `COP / CP / COPA` → `COPA`.
- Conversión comercial gobernada: **14 copas = 1 botella**.
- Los casos ambiguos permanecen en `NEEDS_REVIEW`; no se fuerza una cantidad o presentación incierta.
- Se añadieron guardas para evitar falsos créditos por números que pertenecen al nombre/SKU del producto.
- Se revisó el master contra **3.023 OCRs históricos**:
  - 435 identidades con número terminal fueron auditadas;
  - 73 aliases contaminados por cantidades fueron removidos de forma segura;
  - no se rompieron referencias ni presentaciones.
- Se corrigió la semántica de contabilidad:
  - sin evidencia = `null`;
  - cero conocido = `0`;
  - una partición observada pero vacía = `0`;
  - cantidad parcial/desconocida permanece `null`.
- Las tablas de review/contexto permanecen disponibles para auditoría, pero no contaminan los agregados cuantitativos directos.
- Replay completo del corpus histórico sin cambios inesperados en referencias, status o extracción.
- Layout 1 validado con:
  - BOTELLA observada: **45**;
  - COPA observada: **129**;
  - equivalente observado: **759 unidades base**.
- Layout 2 validado con 32 líneas:
  - **31 cantidades conocidas**;
  - **1 cantidad nula**, preservada para revisión.

## Estado de homologación

La lectura técnica está prácticamente cerrada. Antes de considerar esta etapa lista para release de prueba quedan:

1. finalizar el **FULL_PARSER_FREEZE_AUDIT**;
2. generar un ZIP reproducible con hashes verificados;
3. desplegar únicamente en la Lambda de test;
4. ejecutar un nuevo E2E por WhatsApp;
5. confirmar que el resultado remoto reproduce los replays locales.

No se ha hecho release de producción con este estado.

## Próximo tramo

### 21–22/09
- Freeze audit del parser.
- Manifest de runtime.
- Nuevo ZIP de prueba.
- Deploy controlado en Lambda test.
- Nuevo E2E WhatsApp.

### 22–24/09
- Cerrar elegibilidad.
- Confirmar con Andrés el contrato/punto de integración del avance en botellas.

### 24–25/09
- Acumulación entre tickets.
- Idempotencia mínima / protección contra doble conteo.

### 26–28/09
- UAT con tickets variados.
- Correcciones derivadas de los casos reales.

### 29–30/09
- Producción controlada.
- Validar rollback.
- Preparar handover.

### 01/10
- Margen de go-live / ajuste final.

## Dependencias y pendientes

- Definir qué referencias/marcas son elegibles para cada reto.
- Confirmar con Andrés el contrato exacto para entregar el avance en botellas.
- Confirmar dónde debe vivir la acumulación entre múltiples tickets.
- Completar estrategia mínima de idempotencia para evitar doble contabilización.
- Definir operación de casos `NEEDS_REVIEW`.

## Riesgo conocido

Existe un caso sintético en el que una tabla de precios puede tener exactamente la misma estructura observable que el Layout 2. No se agregó una heurística arbitraria para ocultar este riesgo; queda documentado para resolverlo con una regla comercial o una señal adicional si aparece en datos reales.

## Criterio de finalización

Pernod se considera terminado para este alcance cuando:

1. parser y homologación estén cerrados;
2. elegibilidad y punto de integración con Andrés estén resueltos;
3. acumulación e idempotencia mínima estén implementadas;
4. UAT con casos variados haya pasado;
5. producción controlada, rollback y handover estén validados;
6. el flujo pueda operar sin depender de conocimiento no documentado.

## Siguiente paso

Cerrar el **FULL_PARSER_FREEZE_AUDIT** y, si pasa, generar el paquete reproducible para el próximo E2E remoto.

## Historial

Ver `updates/` para las actualizaciones fechadas.
