# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso  
**Fecha objetivo:** Finalizar el alcance actual antes del **2026-10-01**  
**Última actualización:** 2026-09-17

## Objetivo

Completar el alcance actual de Pernod con un flujo operativo claro, supuestos de integración validados y suficiente documentación para que otra persona o agente pueda entender qué existe, qué falta y cuál debe ser el siguiente paso.

## Meta hasta el 1 de octubre

| Fechas | Objetivo |
|---|---|
| **17–19/09** | Cerrar **parser remoto + homologación** |
| **20–23/09** | Resolver **elegibilidad + punto de integración con Andrés** |
| **24–25/09** | Implementar **acumulación + idempotencia mínima** |
| **26–28/09** | Ejecutar **UAT con tickets variados + correcciones** |
| **29–30/09** | Pasar a **producción controlada + rollback/handover** |
| **01/10** | Mantener margen para **go-live / ajuste final** |

### Secuencia operativa

```text
parser remoto + homologación
→ elegibilidad + integración con Andrés
→ acumulación + idempotencia mínima
→ UAT + correcciones
→ producción controlada + rollback/handover
→ go-live / ajuste final
```

## Estado actual

El trabajo se encuentra actualmente en la primera etapa del plan: **cerrar parser remoto + homologación**, con ventana del **17 al 19 de septiembre**.

En paralelo, se mantiene documentado el contexto técnico necesario para que las siguientes etapas puedan avanzar sin depender de supuestos no registrados.

## Avances hasta ahora

- Pernod cuenta con un repositorio dedicado: `SuperlikersGlobal/campaign-ti-PERNOD`.
- Se avanzó en la definición del flujo de integración con Andrés.
- Se está usando Git como fuente de verdad para mantener la información técnica actualizada y compartible.
- El flujo esperado contempla recibir evidencia o información de origen mediante una carga y transformarla a la estructura requerida por la integración.
- Se identificó una restricción operativa importante: el proceso de Pernod trabaja con **botellas y no con tickets**, por lo que la transformación debe contemplar ese modelo de entrada.
- Se probó desde el entorno local la ruta de búsqueda de participantes en la API de Superlikers.
- La búsqueda probada por email **todavía no confirmó al participante ni expuso el distinct ID / UID esperado**, por lo que ese punto aún necesita validación antes de considerarse resuelto.
- El cronograma de ejecución hasta el 1 de octubre ya está definido con ventanas concretas para homologación, integración, idempotencia, UAT, producción controlada y go-live.

## En progreso

### Etapa actual — 17–19/09

- Cerrar el parser remoto.
- Completar la homologación.
- Dejar preparada la base para iniciar elegibilidad e integración con Andrés a partir del 20/09.

## Próximas etapas

### 20–23/09
- Elegibilidad.
- Punto de integración con Andrés.

### 24–25/09
- Acumulación.
- Idempotencia mínima.

### 26–28/09
- UAT con tickets variados.
- Correcciones derivadas de las pruebas.

### 29–30/09
- Producción controlada.
- Validar rollback.
- Preparar handover.

### 01/10
- Margen para go-live.
- Ajuste final si es necesario.

## Pendientes / bloqueos

- Confirmación final de la estructura canónica de datos y del lugar de almacenamiento.
- Ejemplo funcional que sirva como referencia de integración.
- Confirmación de la búsqueda del identificador del participante.
- Validación end-to-end con casos representativos de Pernod.

## Criterios de finalización

Pernod podrá marcarse como completado para este plan de acción cuando:

1. parser remoto y homologación estén cerrados;
2. elegibilidad y punto de integración con Andrés estén resueltos;
3. acumulación e idempotencia mínima estén implementadas;
4. UAT haya sido ejecutado con casos variados y sus correcciones aplicadas;
5. producción controlada, rollback y handover estén validados;
6. el go-live o ajuste final del 1 de octubre haya quedado resuelto;
7. el flujo resultante y las dependencias restantes queden documentados en Git.

## Siguiente paso

Cerrar **parser remoto + homologación entre el 17 y el 19 de septiembre**. Al finalizar esa etapa, actualizar este documento con el resultado y avanzar a elegibilidad + integración con Andrés.

## Historial

Ver `updates/` para las actualizaciones fechadas.
