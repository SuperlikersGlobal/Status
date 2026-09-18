# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso  
**Fecha objetivo:** Finalizar el alcance actual antes del **2026-10-01**  
**Última actualización:** 2026-09-17

## Objetivo

Completar el alcance actual de Pernod con un flujo operativo claro, supuestos de integración validados y suficiente documentación para que otra persona o agente pueda entender qué existe, qué falta y cuál debe ser el siguiente paso.

## Estado actual

El trabajo se encuentra actualmente en **definición técnica / definición de integración**.

El frente principal consiste en convertir el input operativo real de Pernod en un flujo confiable que pueda implementarse y validarse sin depender de supuestos no documentados.

## Avances hasta ahora

- Pernod cuenta con un repositorio dedicado: `SuperlikersGlobal/campaign-ti-PERNOD`.
- Se avanzó en la definición del flujo de integración con Andrés.
- Se está usando Git como fuente de verdad para mantener la información técnica actualizada y compartible.
- El flujo esperado contempla recibir evidencia o información de origen mediante una carga y transformarla a la estructura requerida por la integración.
- Se identificó una restricción operativa importante: el proceso de Pernod trabaja con **botellas y no con tickets**, por lo que la transformación debe contemplar ese modelo de entrada.
- Se probó desde el entorno local la ruta de búsqueda de participantes en la API de Superlikers.
- La búsqueda probada por email **todavía no confirmó al participante ni expuso el distinct ID / UID esperado**, por lo que ese punto aún necesita validación antes de considerarse resuelto.

## En progreso

- Definir exactamente dónde se almacenará la información integrada y en qué formato.
- Preparar al menos un ejemplo concreto de entrada → transformación → resultado almacenado.
- Validar el mapeo necesario para inputs basados en botellas.
- Confirmar el flujo correcto de búsqueda y resolución de identidad del participante.
- Mantener el contexto de implementación documentado en Git para que otra persona pueda continuar sin depender de memoria de reuniones.

## Pendientes / bloqueos

- Confirmación final de la estructura canónica de datos y del lugar de almacenamiento.
- Ejemplo funcional que sirva como referencia de integración.
- Confirmación de la búsqueda del identificador del participante.
- Validación end-to-end con un caso realista de Pernod.

## Criterios de finalización

Pernod podrá marcarse como completado para este plan de acción cuando:

1. las estructuras de entrada y salida estén explícitamente definidas;
2. la transformación basada en botellas esté definida;
3. la resolución de identidad / participante esté validada o su dependencia quede claramente documentada;
4. al menos un caso representativo end-to-end haya sido validado;
5. el flujo resultante y las dependencias restantes queden documentados en Git.

## Siguiente paso

Crear el ejemplo canónico de integración y usarlo para cerrar uno a uno los supuestos pendientes antes del **2026-10-01**.

## Historial

Ver `updates/` para las actualizaciones fechadas.
