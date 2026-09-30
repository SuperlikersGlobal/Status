# Pernod

**Responsable:** Bruno Antoniassi  
**Estado:** En progreso — homologación técnica PASS / integración WP en curso  
**Última actualización:** 2026-09-30

## Estado ejecutivo

El flujo V4 pasó el smoke real A/B y la verificación visual en panel.

- código base congelado: `b71df3e7ed73f2e57d4ff85f4d973cabe2e43d6b`;
- commit actual con FAILED_INVOICE_RECORD v0: `783f5bdc0f30b829e01334a9b11cc513e04bf2eb`;
- Code RC: PASS;
- Data RC: PASS;
- F1806 golden: 33/33;
- Fase A: PASS;
- Fase B: PASS;
- panel visual: PASS;
- replay sin duplicación;
- V2 intacto.

## Integración WP

El contrato público sigue usando:
`request_id + uid + cdc_uid + campaign_id + image`.

La prueba desde navegador llegó al ambiente V4, pero quedan dos ajustes separados:
- CORS para permitir temporalmente el origen del navegador durante homologación;
- revisión del routing por respuesta `404 NOT_FOUND`.

No se cambia el body de prueba hasta resolver esos dos puntos.

## Facturas que no pasan

`FAILED_INVOICE_RECORD v0` está commitado en `783f5bd`.

Contrato acordado para entrega:
- destino conceptual: `POST /v1/events`;
- `event = rejected_invoices`;
- `category = record_id`;
- el record viaja serializado en `properties.info`.

El capture/outbox v0 ya fue implementado localmente:
- 127 tests nuevos;
- suite completa: 1179 passed + 2 xfailed;
- todavía no está commitado;
- el recheck independiente se detuvo por una precondición de baseline de archivos untracked, no por un defecto identificado en el código.

## Cocktails

Se recibió y analizó el histórico FY26:
- 6.533 registros;
- 565 nombres raw;
- 102 nombres ambiguos;
- 21 referencias válidas asociadas de forma estable a 21 productos tarifarios;
- el nombre del cocktail por sí solo no es autoridad suficiente para mapping automático.

Decisión:
- no modificar el master con aliases automáticos;
- usar el histórico como corpus de evidencia/revisión;
- próximo paso: construir PERNOD_COCKTAIL_CORPUS_V0 de forma determinística.

## Gate actual

1. cerrar CORS + routing del WP en homologación;
2. completar recheck/freeze de capture + outbox;
3. cerrar URL de imagen;
4. ejecutar UAT;
5. cerrar policy comercial real;
6. producción controlada + rollback + handover.

## Producción

No desplegada. El ambiente V4 y los datos TEST_ONLY siguen siendo exclusivamente de homologación.

## Historial

Ver `updates/2026-09-30.md`.
