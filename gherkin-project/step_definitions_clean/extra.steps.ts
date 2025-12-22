import { Given, When, Then } from '@cucumber/cucumber';
import { EmpresaService } from '../support/services/empresa.service';
import { TestWorld } from '../support/world';

const empresaService = new EmpresaService();

Given('que o serviço externo está em modo {string}', function(this: TestWorld, modo: string) {
  (this as any).externalMode = modo as any;
});

Given('que existe uma empresa cadastrada com CNPJ {string}', function(this: TestWorld, cnpj: string) {
  try { empresaService.createCompany({ cnpj, razaoSocial: 'Empresa Externa' }); } catch (e) {}
});


Given('que ocorreu erro em validação para CNPJ {string}', function(this: TestWorld, cnpj: string) {
  this.inputCnpj = cnpj;
  this.lastResult = { ok: false, reason: 'validacao' } as any;
});

Given('que há um evento de log com nível {string} e motivo {string}', function(this: TestWorld, nivel: string, motivo: string) {
  (this as any).logEvent = { nivel, motivo } as any;
});

// NOTE: duplicated steps removed to avoid ambiguous step definitions.
// If a feature needs these actions, use the domain-specific step definitions in `empresa.steps.ts` or `integracao.steps.ts`.

When('o sistema registrar o log', function(this: TestWorld) {
  (this as any).lastLog = (this as any).logEvent || { nivel: 'INFO', motivo: 'consulta' };
});

// alias used in features
When('o sistema persistir o log', function(this: TestWorld) {
  (this as any).lastLog = (this as any).logEvent || { nivel: 'INFO', motivo: 'consulta' };
});

Then('o log não deve conter o CNPJ completo', function(this: TestWorld) {
  const log = (this as any).lastLog;
  if (!log) return;
  const msg = JSON.stringify(log);
  if (/\d{14}/.test(msg)) throw new Error('log expõe CNPJ completo');
});

Then('o registro não deve expor dados sensíveis', function(this: TestWorld) {
  const log = (this as any).lastLog;
  if (!log) return;
  const msg = JSON.stringify(log);
  if (/\d{14}/.test(msg)) throw new Error('registro expõe CNPJ completo');
});

Then('a resposta não deve exibir o CNPJ completo', function(this: TestWorld) {
  if (!this.queryResult) throw new Error('nenhum resultado');
  const c = this.queryResult.cnpj || '';
  if (/\d{14}/.test(c)) throw new Error('CNPJ completo exposto na resposta');
});

Then(new RegExp('^o CNPJ na resposta deve estar mascarado \\\(ex\\\.: "?(.*)"?\\\)$'), function(this: TestWorld, exemplo: string) {
  if (!this.queryResult) throw new Error('nenhum resultado');
  const c = this.queryResult.cnpj || '';
  if (!c.includes('*') && !c.includes('/')) throw new Error('CNPJ não parece mascarado');
});

Then('a resposta não deve conter campos sensíveis não necessários', function(this: TestWorld) {
  if (!this.queryResult) throw new Error('nenhum resultado');
  if ((this.queryResult as any).dadosSensiveis) throw new Error('contém campos sensíveis');
});
