# Template de Checklist

## Estrutura Padrão

[Title]

[Introdução contextualizando a checklist]

[Checklist com itens numerados e explicativos]

[Call to action para recursos adicionais]

---

## Exemplo Preenchido

# Checklist de Release: Go/No-Go

## Antes de liberar uma nova versão, valide esses pontos críticos

Uma checklist bem definida pode ser a diferença entre um release tranquilo e um incidente em produção. Use esta lista para garantir que nada importante escape antes do deploy.

## ✅ Checklist Completa

1. **Testes automatizados passando**
   - [ ] Pipeline de CI com todas as etapas verdes
   - [ ] Cobertura mínima de código atingida (80%+)
   - [ ] Testes de regressão executados com sucesso

2. **Validação manual**
   - [ ] Fluxos críticos do usuário testados (login, pagamento, etc.)
   - [ ] Navegadores e dispositivos suportados verificados
   - [ ] Internacionalização validada (se aplicável)

3. **Segurança**
   - [ ] Scan de vulnerabilidades executado (dependências e código)
   - [ ] Permissões de acesso revisadas
   - [ ] Dados sensíveis protegidos em logs

4. **Performance**
   - [ ] Testes de carga executados com métricas dentro do SLA
   - [ ] Tempos de resposta aceitáveis em todos os endpoints
   - [ ] Uso de memória/CPU dentro dos limites esperados

5. **Monitoramento e observabilidade**
   - [ ] Logs estruturados implementados
   - [ ] Métricas de negócio configuradas
   - [ ] Alertas configurados para cenários críticos

6. **Documentação**
   - [ ] Changelog atualizado com mudanças
   - [ ] Documentação de APIs atualizada (se aplicável)
   - [ ] Guias de migração disponíveis (se breaking changes)

7. **Compliance e regulatória**
   - [ ] LGPD/GDPR compliance verificado (se aplicável)
   - [ ] Auditorias de acessibilidade realizadas (se aplicável)
   - [ ] Requisitos específicos do domínio validados

8. **Comunicação**
   - [ ] Stakeholders notificados sobre o release
   - [ ] Plano de rollback preparado e testado
   - [ ] Suporte técnico ciente das mudanças

## Pronto para release?

Se todos os itens acima estão marcados, você está pronto para seguir com o deploy. Caso contrário, identifique os itens pendentes e resolva antes de prosseguir.

📚 **Quer um template completo de processo de release?** Confira nosso guia sobre [CI/CD para QA](../../03-NIVEL-JUNIOR/05-ci-github-actions.md).

---

## Variações Comuns

### Checklist de Smoke Testing
- [ ] Aplicação inicializa corretamente
- [ ] Telas principais carregam sem erros
- [ ] Funcionalidades críticas respondem
- [ ] Integrações externas acessíveis

### Checklist de Testes de Regressão
- [ ] Casos de teste críticos executados
- [ ] Funcionalidades antigas continuam funcionando
- [ ] Dados migrados corretamente (se aplicável)
- [ ] Performance mantida ou melhorada

### Checklist de Preparação de Ambiente
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados provisionado e migrado
- [ ] Serviços dependentes disponíveis
- [ ] Configurações de segurança aplicadas

---

## Dicas para criação de checklists

✅ Mantenha itens claros e objetivos
✅ Use linguagem afirmativa ("Verificar X" ao invés de "X não foi verificado")
✅ Inclua critérios de aceitação quando relevante
✅ Revise periodicamente com base em lições aprendidas
✅ Torne acessível para toda a equipe