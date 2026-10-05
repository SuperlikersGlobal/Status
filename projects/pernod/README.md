# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso — preparación controlada de producción  
**Última actualización:** 2026-10-05

## Estado ejecutivo

El flujo principal de lectura y validación de facturas ya funciona en el ambiente de pruebas. También quedó validado que podemos conservar la imagen original de una factura aunque termine rechazada, sin generar ventas ni puntos durante esa validación.

El trabajo actual está dividido en dos frentes:

1. terminar los últimos detalles del envío automático de facturas rechazadas;
2. preparar el ambiente de producción de forma controlada, empezando por una versión que sólo revisa y guarda evidencia, sin generar movimientos comerciales.

## Lo que ya está listo

- lectura y validación de facturas en pruebas;
- identificación de productos y conversión a botellas;
- soporte para registrar avance para los perfiles correspondientes;
- manejo de duplicados y reintentos;
- conservación de la imagen original de la factura;
- registro de facturas rechazadas preparado con la imagen incluida;
- versión de revisión para producción preparada y validada localmente;
- separación entre pruebas y producción para evitar efectos accidentales.

## Facturas rechazadas

El flujo ya está preparado para enviar una factura rechazada junto con su información e imagen.

Andrés confirmó dónde debe viajar la imagen dentro de la información del rechazo y esa parte ya quedó incorporada.

Antes de activar el envío automático faltan dos confirmaciones finales de integración:

- confirmar exactamente cómo responde el servicio cuando recibe correctamente un rechazo;
- cerrar la identificación final de la configuración de destino.

Hasta entonces el envío automático permanece bloqueado.

## Producción

Producción todavía no está activa.

La primera versión preparada para producción es intencionalmente limitada: puede recibir una factura, leerla, validarla y guardar evidencia para revisión humana, pero no genera ventas, puntos, créditos ni otros movimientos comerciales.

Antes de crear o habilitar recursos de producción vamos a revisar el ambiente de AWS con un acceso separado de solo lectura. Después de esa revisión, cualquier creación o activación se hará únicamente con aprobación explícita.

## Próximo paso

1. crear el acceso de solo lectura para revisar producción;
2. revisar la configuración actual de AWS sin modificar nada;
3. confirmar los recursos y controles necesarios;
4. pedir aprobación antes de crear la infraestructura de producción;
5. desplegar primero sin acceso público;
6. habilitar pruebas reales sólo después de nuevas aprobaciones.

## Historial

Ver:
- `updates/2026-10-02.md`
- `updates/2026-10-05.md`
