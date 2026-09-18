# Status v0

Status es una vista simple de trabajo para Superlikers: combina **GitHub Issues como backend operativo**, una **interfaz tipo Jira** y una **skill de Claude Code** que traduce el estado técnico a lenguaje ejecutivo.

La primera prueba usa **Bruno / Pernod**.

## Qué permite probar

- ver tareas en un tablero Kanban;
- mover tareas entre Backlog, Ready, En progreso, Bloqueado y Hecho;
- ver una explicación no técnica de cada tarea;
- registrar avances como comentarios de GitHub;
- revisar persona, proyecto y timeline;
- consultar el estado desde Claude Code con `/status`;
- mantener GitHub como fuente de verdad sin crear una base de datos adicional.

## Arquitectura v0

```text
Status UI
   ↓
Node API
   ↓
GitHub Issues
   ↓
Status repo / branches personales
   ↓
Claude /status
```

### GitHub Issues

Cada card de trabajo es una Issue con metadatos `STATUS_V0` dentro del cuerpo.

Esto permite que la UI trate GitHub como backend estructurado sin depender todavía de GitHub Projects ni de una base de datos propia.

### Branches personales

Las branches personales siguen guardando contexto de mayor nivel:

```text
PERSONAL_PLAN.md
projects/
  <proyecto>/
    README.md
    updates/
```

Para Bruno, la branch actual es `bruno`.

### Skill `/status`

La skill vive en:

```text
.claude/skills/status/
```

Antes de responder debe leer siempre:

1. `STATUS_RULES.md`;
2. `.claude/skills/status/REFERENCE.md`;
3. las fuentes relevantes del repositorio.

Su objetivo es explicar el estado para una persona no técnica, no enseñar Git.

## Ejecutar la UI hoy

Requisito: **Node.js 18 o superior**.

### Modo demo

No requiere credenciales:

```bash
npm start
```

Abrir:

```text
http://localhost:4173
```

El tablero funciona visualmente y permite simular cambios durante la sesión, pero no escribe en GitHub.

### Modo GitHub live

El servidor necesita un token con acceso al repositorio privado.

```bash
export GITHUB_TOKEN="<token-con-acceso-al-repo>"
export GITHUB_REPO="SuperlikersGlobal/Status"
npm start
```

Nunca colocar el token en `public/app.js` ni hacer commit del `.env`.

En modo live:

- mover un card actualiza el estado dentro de la Issue;
- mover a **Hecho** cierra la Issue;
- sacar de **Hecho** la reabre;
- registrar un avance crea un comentario real en la Issue.

## Estado inicial de Pernod

| Ventana | Tarea | Estado |
|---|---|---|
| 17–19/09 | Parser remoto + homologación | En progreso |
| 20–23/09 | Elegibilidad + integración con Andrés | Ready |
| 24–25/09 | Acumulación + idempotencia mínima | Backlog |
| 26–28/09 | UAT + correcciones | Backlog |
| 29–30/09 | Producción controlada + rollback/handover | Backlog |
| 01/10 | Go-live / ajuste final | Backlog |

Las seis tareas ya existen como Issues del repositorio.

## Estados soportados

```text
Backlog
Ready
En progreso
Bloqueado
Hecho
```

## Reglas de producto

- GitHub es la fuente operativa de verdad para las tareas de esta v0.
- No inventar progreso ni porcentajes manuales.
- El estado actual de una tarea está en su Issue.
- El contexto de la persona/proyecto puede vivir en su branch personal.
- La interfaz muestra lenguaje simple primero y detalle técnico después.
- Las credenciales quedan siempre del lado del servidor.
- `/status` es de lectura y explicación en esta v0.

## Estructura

```text
.
├── STATUS_RULES.md
├── server.mjs
├── package.json
├── data/
│   └── demo.json
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── .claude/
    └── skills/
        └── status/
            ├── SKILL.md
            └── REFERENCE.md
```

## Por qué esta v0 sirve para MyDesk

El experimento valida un modelo de tarea que después puede moverse de GitHub a MyDesk sin cambiar el concepto principal:

```text
Task {
  title
  project
  owner
  status
  priority
  start
  due
  acceptance_criteria
  updates[]
}
```

La interfaz y la capa semántica pueden evolucionar mientras el backend cambia de GitHub a un servicio propio.
