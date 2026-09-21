# Status v0 — Reglas de lectura y respuesta

Estas reglas son obligatorias para cualquier agente que lea o explique el estado de trabajo de este repositorio.

## 1. Propósito

Status debe permitir que una persona no técnica entienda rápidamente qué está haciendo alguien, qué debe entregar, qué cambió, qué está bloqueado, cuál es el siguiente paso y cuál es la fecha objetivo.

## 2. Regla principal: evidencia + recencia

Nunca decidir el estado solo por el tipo de archivo.

Una fuente estructurada pero antigua **no puede anular** una actualización posterior respaldada por evidencia.

Antes de responder:

1. leer este archivo;
2. leer `README.md`;
3. consultar el estado estructurado disponible;
4. localizar la branch personal de la persona;
5. leer `PERSONAL_PLAN.md`, el README del proyecto y la actualización fechada más reciente;
6. comparar las fechas de todas las fuentes relevantes;
7. resolver el estado usando la evidencia más reciente y explícita.

## 3. Fuentes operativas

Si la API local de Status está activa, consultar `http://127.0.0.1:4173/api/status` y `http://127.0.0.1:4173/api/tasks`.

Si no está activa, leer `data/status.json` y revisar siempre `generated_at`.

**Regla crítica:** si existe una actualización fechada en la branch personal posterior a `generated_at`, el snapshot no puede usarse para negar o sobrescribir esa evidencia más nueva.

## 4. Cómo leer branches personales

No cambiar de branch solo para consultar información.

Usar lectura segura, por ejemplo:

- `git branch --list`
- `git show bruno:PERSONAL_PLAN.md`
- `git show bruno:projects/pernod/README.md`
- `git ls-tree -r --name-only bruno projects/pernod/updates/`

Para updates, identificar el archivo fechado más reciente y leerlo con `git show`.

## 5. Estados permitidos

- `backlog` → Backlog
- `ready` → Ready
- `in_progress` → En progreso
- `blocked` → Bloqueado
- `done` → Hecho

No inventar porcentajes de avance.

No considerar una tarea terminada porque fue discutida, iniciada o parcialmente validada.

## 6. Traducción para personas no técnicas

Explicar primero el significado operativo y después, solo si aporta valor, el término técnico.

- `parser remoto` → componente que recibe e interpreta información enviada de forma remota;
- `homologación` → validación del funcionamiento antes de producción;
- `idempotencia` → repetir el mismo procesamiento no debe generar duplicados;
- `rollback` → forma segura de volver atrás si algo falla;
- `handover` → documentación suficiente para que otra persona pueda asumir el trabajo;
- `UAT` → pruebas con casos representativos antes de producción;
- `go-live` → activación del flujo para uso real.

## 7. Disciplina de evidencia

Separar hechos confirmados, trabajo en progreso, pendientes, bloqueos, próximos pasos y objetivos futuros.

No convertir una intención en resultado. No inferir responsables, fechas, bloqueos o decisiones que no estén documentados.

Si dos fuentes se contradicen:

1. comparar fechas;
2. distinguir plan de evidencia ejecutada;
3. preferir la evidencia más reciente respaldada;
4. si la contradicción no puede resolverse, decirlo explícitamente.

## 8. Respuesta ejecutiva por defecto

Cuando aplique:

**Estado:** ...

**Ahora:** ...

**Meta:** ...

**Último avance:** ...

**Riesgo o bloqueo:** ...

**Próximo hito:** ...

No mostrar SHAs, branches, rutas internas o mecánicas de Git salvo solicitud explícita.

## 9. Preguntas sobre plazo

Para decir si algo está a tiempo, comparar fecha actual, fecha objetivo, gate actual y evidencia más reciente.

Si una fecha intermedia venció pero una actualización posterior redefinió explícitamente el gate, explicar el cambio de plan en vez de usar automáticamente la fecha antigua.

No especular sobre la causa de un retraso.

## 10. Idioma

Las respuestas de Status para Superlikers deben ser en español, salvo instrucción explícita del usuario en ese momento.
