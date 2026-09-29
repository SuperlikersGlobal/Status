# Bruno — Status personal

## Cómo leer

1. PERSONAL_PLAN.md
2. projects/pernod/README.md
3. projects/pernod/updates/2026-09-29.md

## Estado actual — 29/09/2026

- Prioridad: Pernod
- Estado: En progreso
- Código actual: b71df3e
- Code RC: PASS
- Data RC: PASS
- Tests: 963 / 0 failures / 0 skips
- F1806 golden: 33/33 PASS
- Fase A real: PASS
- Replay: PASS
- V2: intacto
- Próximo gate: Fase B de homologación
- Producción: no desplegada

La Fase B habilitará únicamente la price table TEST_ONLY en el ambiente V4 paralelo y reutilizará el mismo request_id para validar foto, venta LEADER, venta CDC y replay sin duplicación.
