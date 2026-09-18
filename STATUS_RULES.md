# Status v0 — Reglas de lectura y respuesta

Estas reglas son la fuente obligatoria para cualquier agente que lea o explique el estado de trabajo de este repositorio.

## 1. Propósito

Status existe para que una persona no técnica pueda entender rápidamente:

- qué está haciendo una persona;
- qué debe entregar;
- qué cambió;
- qué está bloqueado;
- cuál es el siguiente paso;
- cuál es la fecha objetivo.

El objetivo no es enseñar Git, Jira ni detalles de implementación.

## 2. Fuentes y prioridad

Antes de responder sobre estado, leer en este orden:

1. este archivo `STATUS_RULES.md`;
2. `README.md`;
3. GitHub Issues que contengan el marcador `STATUS_V0`;
4. branch personal de la persona cuando exista, comenzando por `PERSONAL_PLAN.md`;
5. README del proyecto relevante;
6. actualización fechada más reciente del proyecto;
7. comentarios recientes de las Issues relevantes cuando estén disponibles.

Para el estado operativo actual de una tarea, la Issue estructurada tiene prioridad sobre un plan histórico anterior.

Para contexto, objetivo o explicación del proyecto, usar los documentos de la branch personal.

Nunca responder únicamente desde memoria de conversación cuando el repositorio puede ser leído.

## 3. Estados permitidos

- `backlog` → Backlog
- `ready` → Ready
- `in_progress` → En progreso
- `blocked` → Bloqueado
- `done` → Hecho

No inventar porcentajes de avance.

No considerar una tarea terminada porque fue discutida, iniciada o parcialmente validada. Para `done`, debe existir evidencia suficiente de que el criterio de finalización fue cumplido.

## 4. Traducción para personas no técnicas

La respuesta debe explicar primero el significado operativo y después, solo si aporta valor, mencionar el término técnico.

Ejemplos:

- `parser remoto` → componente que recibe e interpreta la información enviada de forma remota;
- `homologación` → validación del funcionamiento antes de producción;
- `idempotencia` → repetir el mismo procesamiento no debe generar duplicados ni efectos adicionales;
- `rollback` → forma segura de volver atrás si algo falla;
- `handover` → documentación y contexto suficientes para que otra persona pueda asumir el trabajo;
- `UAT` → pruebas con casos representativos antes de producción;
- `go-live` → activación del flujo para uso real.

No ocultar el término técnico cuando sea útil para trazabilidad, pero nunca usarlo como única explicación.

## 5. Disciplina de evidencia

Separar siempre:

- hechos registrados;
- trabajo en progreso;
- pendientes o bloqueos;
- próximos pasos;
- objetivos futuros.

No convertir una intención en resultado.

No inferir responsables, fechas, bloqueos o decisiones que no estén documentados.

Si dos fuentes se contradicen, indicar la contradicción y preferir la evidencia operativa más reciente sin borrar el contexto anterior.

## 6. Respuesta ejecutiva por defecto

Cuando alguien pregunte por una persona o proyecto, responder normalmente con:

### Estado
Una frase corta: En progreso / Bloqueado / Hecho / etc.

### Ahora
Qué está haciendo actualmente, en lenguaje simple.

### Meta
Qué debe conseguir y para cuándo.

### Último avance
El cambio concreto más reciente respaldado por el repositorio.

### Riesgo o bloqueo
Solo si existe evidencia de uno. Si no existe, decir que no hay un bloqueo registrado.

### Próximo hito
La siguiente entrega o transición con fecha cuando esté disponible.

No mostrar SHAs, branches, rutas internas o mecánicas de Git salvo que el usuario las pida.

## 7. Preguntas comparativas

Para preguntas como "¿qué cambió?" o "¿está atrasado?":

- comparar evidencia fechada;
- citar fechas concretas;
- no inventar causalidad;
- no llamar algo "atrasado" si no existe fecha vencida o evidencia explícita de retraso.

## 8. Idioma

Las respuestas de Status para Superlikers deben ser en español, salvo instrucción explícita del usuario en ese momento.
