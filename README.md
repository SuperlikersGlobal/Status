# Status

Repositorio interno para el seguimiento de metas personales, proyectos activos y progreso operativo del equipo de Superlikers.

## Objetivo

Permitir que liderazgo y cada miembro del equipo puedan responder rápidamente:

- ¿En qué está enfocada la persona ahora?
- ¿Cuál es la meta y cuál es la fecha objetivo?
- ¿Qué avances concretos ya existen?
- ¿Qué está bloqueado o pendiente?
- ¿Cuál es el siguiente paso?

## Modelo de organización

Cada persona tiene una branch propia.

```text
main
├── README.md
└── branches por persona
    ├── bruno
    ├── <siguiente-persona>
    └── ...
```

La branch de cada persona funciona como fuente de verdad de su estado personal.

Dentro de cada branch:

```text
PERSONAL_PLAN.md
projects/
  <proyecto>/
    README.md
    updates/
      YYYY-MM-DD.md
```

## Reglas de uso

1. Registrar hechos y avances concretos, evitando reportes largos sin señal útil.
2. Separar claramente objetivo, estado actual, avances, pendientes y siguiente paso.
3. Toda meta relevante debe tener una fecha objetivo o estar marcada como `Por definir`.
4. Las actualizaciones deben estar fechadas para conservar el historial.
5. La información aún no confirmada debe marcarse como pendiente, nunca como completada.
6. No incluir contraseñas, tokens, llaves privadas ni otros secretos.
7. La branch personal debe poder entenderse sin depender de contexto externo, reuniones o conversaciones privadas.

## Cómo leer este repositorio

Para seguir a una persona, abre su branch y comienza por `PERSONAL_PLAN.md`.

Después, entra en `projects/<proyecto>/README.md` para ver el estado actual y en `updates/` para revisar el historial de avances.

## Estado inicial

- Bruno: activo
- Otras personas: aún no configuradas
