# 01 — Padrões, Nomenclatura e Convenções

- Arquivos `.feature` em `features/` devem usar `snake_case` no nome do arquivo.
- Título de Funcionalidade: `CNPJ — validação`, `CNPJ — normalização`, etc.
- Nome de cenários: `[Regra] — [Resultado]` (ex.: `[Validação] — Sucesso`).
- Sempre escrever em PT-BR: use `# language: pt` no topo do arquivo.
- Use `Rule` para dividir regras de negócio dentro de uma `Funcionalidade` quando necessário.

Quando usar Contexto (Background): apenas para pré-condições inofensivas compartilhadas entre todos os cenários; evite dependências ocultas.

Anti-patterns:

- Cenário longo que cobre múltiplas regras.
- Steps técnicos (ex.: "clicar no botão X") em vez de comportamentais.
- Dependência entre cenários (estado compartilhado sem reset).
