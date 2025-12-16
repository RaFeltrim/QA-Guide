# Relatório de Reorganização — QA-Guide

Resumo das ações realizadas durante a reorganização e deduplicação do conteúdo.

Resumo rápido
- Escopo: reorganização de conteúdo existente, deduplicação de temas e criação de referências canônicas.
- Data: 16 de dezembro de 2025
- Autor: automação (assistente de repositório)

Principais alterações aplicadas
- `01-FUNDAMENTOS/03-piramide-testes.md`: refatorado para versão introdutória com cross-ref para
  `03-NIVEL-JUNIOR/08-estrategia-funneling.md` (conteúdo aplicado mantido em Júnior).
- `04-NIVEL-PLENO/10-soft-skills-qa.md`: conteúdo absorvido em
  `04-NIVEL-PLENO/09-comunicacao-negocio.md` e o arquivo original removido.
- `04-NIVEL-PLENO/00-indice.md`: atualizado para remover referência redundante a `10-soft-skills-qa.md`.
- `QA-Guide/REFERENCES.md`: criado anteriormente para apontar o `CNPJ-Docs` como fonte canônica.

Duplicatas / temas detectados (visão geral)
- Pirâmide / Funneling de testes: presente em `01-FUNDAMENTOS/03-piramide-testes.md` e
  `03-NIVEL-JUNIOR/08-estrategia-funneling.md` — decisão: manter a versão aplicada em Júnior
  e manter um resumo introdutório em Fundamentos com referência cruzada.
- Soft skills / Comunicação: sobreposição entre `04-NIVEL-PLENO/09-comunicacao-negocio.md` e
  `04-NIVEL-PLENO/10-soft-skills-qa.md` — decisão: mesclar em `09-comunicacao-negocio.md`.
- Validador de CNPJ e fixtures: referências centralizadas em `gabarito/exemplos-codigo/` e
  `QA-Guide/fixtures/*`; mantivemos links para `CNPJ-Docs` em `QA-Guide/REFERENCES.md` ao invés de copiar
  versões canônicas.

Ações de deduplicação e critérios aplicados
- Critério principal: manter a versão que melhor segue o padrão pedagógico (O que → Por que → Exemplo → Exercício),
  mais detalhada e mais prática. Quando ambos são progressão natural (ex.: Pleno vs Sênior), manter ambos com cross-ref.

Arquivos criados/alterados
- Criado: `QA-Guide/REORG_REPORT.md` (este arquivo)
- Atualizado: `QA-Guide/01-FUNDAMENTOS/03-piramide-testes.md`
- Atualizado: `QA-Guide/04-NIVEL-PLENO/09-comunicacao-negocio.md` (conteúdo mesclado)
- Atualizado: `QA-Guide/04-NIVEL-PLENO/00-indice.md`
- Removido: `QA-Guide/04-NIVEL-PLENO/10-soft-skills-qa.md`

Pendências e recomendações finais
- Expandir conteúdo avançado do nível Pleno e Sênior (documentação ainda marcada como `not-started`).
- Rodar validações locais: executar `pytest` nos exemplos Python e lints de markdown para garantir links/formatos.
- Opcional: criar um commit único com todas as mudanças e abrir PR para revisão de conteúdo por pares.

Comandos rápidos sugeridos para validação local
```powershell
cd .\QA-Guide
pip install -r requirements.txt   # se usar exemplos Python
pytest -q gabarito/exemplos-codigo/tests -q
# Markdown link check (exemplo com markdown-link-check se instalado)
markdown-link-check README.md
```

Próximos passos propostos (escolher um):
1. Expandir Pleno/Sênior e gerar gabaritos adicionais (recomendado antes do merge final).
2. Rodar testes locais e corrigir problemas encontrados (prioridade média).
3. Abrir PR com este conjunto de mudanças para revisão e merge.

Se desejar, eu posso: (a) rodar verificações locais básicas aqui (se autorizar execução de testes),
ou (b) preparar o PR com branch e commit message sugerido.

*** Fim do relatório
