# Status — Execution Reference

Estas reglas complementan `STATUS_RULES.md` y son obligatorias para la skill `/status`.

## 1. Prioridad de reglas

1. seguridad y protección de datos;
2. instrucción explícita del usuario actual;
3. `STATUS_RULES.md`;
4. reglas documentadas del repositorio;
5. evidencia operativa estructurada;
6. documentos de contexto;
7. patrones observados;
8. defaults de esta skill.

## 2. Marcador de tareas Status v0

Las tareas operativas de Status v0 son GitHub Issues cuyo cuerpo contiene:

```text
<!-- STATUS_V0
{...metadata JSON...}
-->
```

Los metadatos soportados actualmente son:

- `project`
- `owner`
- `status`
- `priority`
- `start`
- `due`
- `order`

No confundir cualquier Issue del repositorio con una tarea Status v0. El marcador es obligatorio.

## 3. Cuerpo de una tarea

Las secciones actuales son:

- `Qué estamos haciendo`
- `Por qué importa`
- `Criterio de finalización`
- `Detalle técnico`

Para respuestas no técnicas, priorizar las tres primeras.

## 4. Estado actual vs contexto histórico

La Issue representa el estado operativo actual de la tarea.

La branch personal y sus documentos representan contexto, objetivos y evolución.

Si una Issue dice `done` pero un README antiguo dice `En progreso`, no repetir el estado antiguo como actual. Puede mencionarse como contexto histórico si es relevante.

Si el documento más reciente contradice una Issue sin que exista evidencia suficiente para decidir cuál es correcta, señalar la discrepancia en vez de resolverla por intuición.

## 5. Comentarios

Los comentarios de una Issue representan actualizaciones cronológicas, pero no cambian automáticamente el estado estructurado.

Usarlos para responder "qué cambió" y "último avance".

No convertir frases exploratorias de un comentario en hechos cerrados.

## 6. Evaluación de cronograma

Para responder si algo está a tiempo:

- comparar la fecha actual con `start` y `due`;
- verificar el estado actual;
- verificar la última evidencia registrada;
- no afirmar retraso antes de que venza la fecha;
- si la fecha venció y la tarea sigue abierta, describir el hecho: "la fecha objetivo ya pasó y la tarea sigue abierta".

No especular sobre la causa.

## 7. Traducción semántica

La traducción debe preservar significado. Simplificar no significa alterar.

Ejemplo correcto:

`idempotencia mínima` → "evitar que repetir el mismo procesamiento genere duplicados o efectos adicionales".

Ejemplo incorrecto:

`idempotencia mínima` → "garantizar que nunca habrá errores".

## 8. Respuesta por audiencia

Por defecto, asumir una audiencia ejecutiva/no técnica.

Si el usuario pide detalle técnico, se puede incluir una segunda sección breve llamada `Detalle técnico`, después de la explicación simple.

## 9. Trazabilidad

Cuando ayude a verificar el dato, mencionar:

- número de Issue;
- fecha de la actualización;
- nombre del proyecto.

No mostrar SHAs, comandos Git o rutas internas salvo solicitud explícita.

## 10. Escritura

La skill `/status` v0 es de lectura y explicación. No debe editar Issues, cambiar estados ni escribir documentos por defecto.

Si el usuario pide una modificación, explicar que esa es una acción de actualización y seguir el mecanismo de escritura aprobado para el repositorio, sin fingir que `/status` ya realizó el cambio.
