# MyDesk + Jira

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso — desarrollo y validación local  
**Última actualización:** 2026-10-08

## Objetivo

Permitir que los equipos de SuperLikers administren su trabajo cotidiano desde MyDesk, sin tener que operar Jira. Hacer la transición por equipos, con Jira como archivo de consulta temporal, y sin construir otro gestor de tareas.

## Enfoque acordado

MyDesk ya ofrece tareas, responsables, tableros, estados, comentarios, historial, proyectos, sprints y control de acceso. La decisión es aprovechar esa base.

El prototipo `SuperlikersGlobal/Status` se mantiene como referencia de comunicación y presentación; **GitHub Issues no será el backend del MyDesk**.

## Avances confirmados

- **Arquitectura:** revisión independiente concluyó que conviene evolucionar el sistema nativo de MyDesk, no crear una aplicación paralela.
- **Flujo de tareas:** las reglas de revisión y aceptación quedaron implementadas, probadas y revisadas localmente. Todavía no están desplegadas al equipo.
- **Importación de Jira:** la asignación de tablero del responsable fue corregida en el repositorio del MyDesk. No se confirmó si ese cambio llegó al sitio publicado.
- **Incidencias:** el mapeo de su estado inicial se corrigió y probó localmente.
- **Jerarquía:** se construyó un clasificador previo, sin escritura, que distingue estructuras y tareas por sus relaciones. Se probó con datos reales de Jira obtenidos únicamente en lectura.
- **Diagnóstico:** la conciliación de identidades fue completa; quedan tres relaciones de jerarquía excepcionales y la revisión del trabajo propio registrado en algunos elementos padre.

## Gate actual

**Definir el tratamiento mínimo de las excepciones de jerarquía y la preservación del trabajo de los elementos padre.**

Después, revalidar sólo los casos afectados. La importación real sigue pendiente y no está autorizada.

## Camino mínimo

1. Resolver las excepciones y finalizar la preparación local del importador.
2. Validar correspondencia de personas, tareas y permisos en un piloto acotado.
3. Tras autorización explícita, migrar un equipo, confirmar su trabajo en MyDesk y dejar su Jira en solo lectura.
4. Repetir el proceso por equipo; retirar Jira cuando ya no sea necesario para trabajar ni consultar el histórico esencial.

## Límites actuales

- Desarrollo nuevo y pruebas: **sólo local**.
- No se ha ejecutado importación real ni cutover.
- Los cambios locales todavía no constituyen funcionalidad desplegada.
- Ningún cambio externo adicional sin aprobación explícita.

## Historial

- `updates/2026-10-08.md`
