# Status

Repositorio interno para acompanhamento de metas pessoais, projetos ativos e progresso operacional da equipe Superlikers.

## Objetivo

Permitir que lideranca e cada membro da equipe consigam responder rapidamente:

- Em que a pessoa esta focada agora?
- Qual e a meta e o prazo?
- O que ja avancou?
- O que esta bloqueado ou pendente?
- Qual e o proximo passo?

## Modelo de organizacao

Cada pessoa possui uma branch propria.

```text
main
├── README.md
└── branches por pessoa
    ├── bruno
    ├── <proxima-pessoa>
    └── ...
```

A branch da pessoa e a fonte de verdade do seu status pessoal.

Dentro de cada branch:

```text
PERSONAL_PLAN.md
projects/
  <project>/
    README.md
    updates/
      YYYY-MM-DD.md
```

## Regras de uso

1. Registrar fatos e avancos concretos, evitando relatorios longos.
2. Separar claramente objetivo, estado atual, avancos, pendencias e proximo passo.
3. Toda meta relevante deve ter prazo ou estar marcada como `To be decided`.
4. Atualizacoes devem ser datadas para preservar historico.
5. Informacao ainda nao confirmada deve ser marcada como pendente, nunca escrita como concluida.
6. Nao incluir senhas, tokens, chaves privadas ou outros segredos.
7. A branch pessoal deve continuar compreensivel sem depender de contexto externo ou de conversas privadas.

## Como ler

Para acompanhar uma pessoa, abra sua branch e comece por `PERSONAL_PLAN.md`. Depois, entre em `projects/<project>/README.md` para ver o estado atual e em `updates/` para o historico.

## Estado inicial

- Bruno: ativo
- Demais pessoas: ainda nao configuradas
