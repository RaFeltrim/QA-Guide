# Como Contribuir — QA-Guide

Obrigado por contribuir! Siga estas diretrizes para que PRs e issues sejam rápidos de revisar.

1. Fork e branch
- Faça fork do repositório e crie uma branch com prefixo `feature/` ou `fix/`.

2. Padrões de conteúdo
- Use a estrutura `NN-titulo-descritivo.md` nas pastas de nível.
- Mantenha tom didático e exemplos executáveis quando possível.

3. Templates
- Use `gabarito/templates/bug-report.md` e `test-case.md` para artefatos.

4. Testes e verificação local
- Para código Python: crie/ative um venv e rode `pytest`.
- Para exemplos JS/Cypress: execute `npm install` dentro do exemplo antes de rodar.

5. Pull Request
- Escreva descrição clara: objetivo, alterações e como validar.
- Vincule issues relacionadas e adicione reviewer(s).

6. Revisão e merge
- PRs aprovados pelo menos por 1 reviewer e build CI verde.
- Mantenha commits pequenos e com mensagens descritivas.

7. Código de Conduta
- Respeite colaboradores: feedbacks devem ser construtivos.

Contato: abra uma issue para dúvidas sobre contribuição.
