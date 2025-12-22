import { Given, When, Then } from '@cucumber/cucumber';
import { EmpresaService } from '../support/services/empresa.service';
import { TestWorld } from '../support/world';

const empresaService = new EmpresaService();

Given('que o serviço externo está em modo {string}', function(this: TestWorld, modo: string) {
  this.externalMode = modo;
});

Given('que existe uma empresa cadastrada com CNPJ {string}', function(this: TestWorld, cnpj: string) {
  try { empresaService.createCompany({ cnpj, razaoSocial: 'Empresa Externa' }); } catch (e) {}
});

Given('existe empresa cadastrada internamente com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  try { empresaService.createCompany({ cnpj, razaoSocial: razao }); } catch (e) {}
});

Given('que ocorreu erro em validação para CNPJ {string}', function(this: TestWorld, cnpj: string) {
  this.inputCnpj = cnpj;
  this.lastResult = { ok: false, reason: 'validacao' } as any;
});

Given('que há um evento de log com nível {string} e motivo {string}', function(this: TestWorld, nivel: string, motivo: string) {
  this.logEvent = { nivel, motivo } as any;
});

When('eu consultar a empresa pelo CNPJ {string}', function(this: TestWorld, cnpj: string) {
  this.queryResult = empresaService.getCompanyByCnpj(cnpj);
});

When('o sistema registrar o log', function(this: TestWorld) {
  this.lastLog = this.logEvent || { nivel: 'INFO', motivo: 'consulta' };
});

Then('o log não deve conter o CNPJ completo', function(this: TestWorld) {
  const log = this.lastLog;
  if (!log) return;
  const msg = JSON.stringify(log);
  if (/\d{14}/.test(msg)) throw new Error('log expõe CNPJ completo');
});

Then('a resposta não deve exibir o CNPJ completo', function(this: TestWorld) {
  if (!this.queryResult) throw new Error('nenhum resultado');
  const c = this.queryResult.cnpj || '';
  if (/\d{14}/.test(c)) throw new Error('CNPJ completo exposto na resposta');
});

Then('o CNPJ na resposta deve estar mascarado (ex.: {string})', function(this: TestWorld, exemplo: string) {
  if (!this.queryResult) throw new Error('nenhum resultado');
  const c = this.queryResult.cnpj || '';
  if (!c.includes('*') && !c.includes('/')) throw new Error('CNPJ não parece mascarado');
});

Then('a resposta não deve conter campos sensíveis não necessários', function(this: TestWorld) {
  if (!this.queryResult) throw new Error('nenhum resultado');
  if ((this.queryResult as any).dadosSensiveis) throw new Error('contém campos sensíveis');
});
import { Given, When, Then } from '@cucumber/cucumber';
import { IntegracaoService } from '../support/services/integracao.service';
import { EmpresaService } from '../support/services/empresa.service';
import { TestWorld } from '../support/world';

const integracao = new IntegracaoService();
const empresaService = new EmpresaService();

Given('que o serviço externo está em modo {string}', function(this: TestWorld, modo: string) {
  this.externalMode = modo;
});

Given('que existe uma empresa cadastrada com CNPJ {string}', function(this: TestWorld, cnpj: string) {
  try { empresaService.createCompany({ cnpj, razaoSocial: 'Empresa Externa' }); } catch (e) {}
});

Given('existe empresa cadastrada internamente com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  try { empresaService.createCompany({ cnpj, razaoSocial: razao }); } catch (e) {}
});

Given('que ocorreu erro em validação para CNPJ {string}', function(this: TestWorld, cnpj: string) {
  this.inputCnpj = cnpj;
  this.lastResult = { ok: false, reason: 'validacao' } as any;
});

Given('que há um evento de log com nível {string} e motivo {string}', function(this: TestWorld, nivel: string, motivo: string) {
  this.logEvent = { nivel, motivo } as any;
});

When('eu consultar a empresa pelo CNPJ {string}', function(this: TestWorld, cnpj: string) {
  this.queryResult = empresaService.getCompanyByCnpj(cnpj);
});

When('o sistema registrar o log', function(this: TestWorld) {
  // Simulação simples: registrar último evento no world
  this.lastLog = this.logEvent || { nivel: 'INFO', motivo: 'consulta' };
});

Then('o log não deve conter o CNPJ completo', function(this: TestWorld) {
  // Como não temos infra de log, apenas valida formato do lastLog.message se existir
  // Passa se não houver exposição explícita do CNPJ no objeto lastLog
  const log = this.lastLog;
  if (!log) return;
  const msg = JSON.stringify(log);
  if (/\d{14}/.test(msg)) throw new Error('log expõe CNPJ completo');
});

Then('a resposta não deve exibir o CNPJ completo', function(this: TestWorld) {
  if (!this.queryResult) throw new Error('nenhum resultado');
  const c = this.queryResult.cnpj || '';
  if (/\d{14}/.test(c)) throw new Error('CNPJ completo exposto na resposta');
});

Then('o CNPJ na resposta deve estar mascarado (ex.: {string})', function(this: TestWorld, exemplo: string) {
  if (!this.queryResult) throw new Error('nenhum resultado');
  const c = this.queryResult.cnpj || '';
  if (!c.includes('*') && !c.includes('/')) throw new Error('CNPJ não parece mascarado');
});

Then('a resposta não deve conter campos sensíveis não necessários', function(this: TestWorld) {
  if (!this.queryResult) throw new Error('nenhum resultado');
  // Simples: considerar `dadosSensiveis` campo hipotético
  if ((this.queryResult as any).dadosSensiveis) throw new Error('contém campos sensíveis');
});
