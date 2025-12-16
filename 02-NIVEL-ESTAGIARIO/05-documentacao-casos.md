# Documentação de Casos de Teste

Estrutura recomendada:
- ID
- Título
- Pré-condições
- Passos
- Resultado esperado
- Resultado obtido
- Observações

Inclui exemplo de caso simples ao final.
# Documentação de Casos de Teste


Formato recomendado para casos de teste (ID, título, passos, resultado esperado, severidade).

Use o template em [gabarito/templates/test-case.md](gabarito/templates/test-case.md#L1).

Exemplo rápido de caso de teste:

- ID: QA-001-TC-0001
- Título: Login com credenciais válidas
- Pré-condições: Usuário registrado
- Passos:
	1. Acessar /login
	2. Informar email e senha válidos
	3. Submeter
- Resultado Esperado: Usuário autenticado e redirecionado para /dashboard

