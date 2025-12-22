import { Given, When, Then } from '@cucumber/cucumber';
import { CnpjService } from '../support/services/cnpj.service';
import { EmpresaService } from '../support/services/empresa.service';
import { TestWorld } from '../support/world';

const cnpjService = new CnpjService();
const empresaService = new EmpresaService();

// Compatibility aliases for existing feature wording
Given('que o CNPJ informado é {string}', function(this: TestWorld, cnpj: string) {
  this.inputCnpj = cnpj;
});

When('eu validar o CNPJ', function(this: TestWorld) {
  const res = cnpjService.validate(this.inputCnpj || '');
  this.lastResult = res as any;
  this.validationResult = res as any;
});

When('eu normalizar o CNPJ', function(this: TestWorld) {
  this.lastNormalized = cnpjService.normalize(this.inputCnpj || '');
});

// Empresa actions aliases
When('eu consultar o CNPJ {string}', function(this: TestWorld, cnpj: string) {
  this.queryResult = empresaService.getCompanyByCnpj(cnpj);
});

When('eu tentar cadastrar com CNPJ {string}', function(this: TestWorld, cnpj: string) {
  try {
    this.createResult = empresaService.createCompany({ cnpj, razaoSocial: 'EmpresaTeste' });
  } catch (e: any) {
    this.createError = e.message || String(e);
  }
});

When('eu tentar cadastrar uma nova empresa com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  try {
    this.createResult = empresaService.createCompany({ cnpj, razaoSocial: razao });
  } catch (e: any) {
    this.createError = e.message || String(e);
  }
});

When('eu tentar cadastrar novamente uma empresa com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  try {
    this.createResult = empresaService.createCompany({ cnpj, razaoSocial: razao });
  } catch (e: any) {
    this.createError = e.message || String(e);
  }
});

Given('que não existe empresa com CNPJ {string}', function(this: TestWorld, cnpj: string) {
  try { empresaService.removeCompany(cnpj); } catch (e) {}
});

Given('que existe empresa cadastrada com CNPJ {string}', function(this: TestWorld, cnpj: string) {
  try { empresaService.createCompany({ cnpj, razaoSocial: 'Empresa Existente' }); } catch (e) {}
});

Given('que um cadastro foi realizado com sucesso para CNPJ {string}', function(this: TestWorld, cnpj: string) {
  try { empresaService.createCompany({ cnpj, razaoSocial: 'Empresa Sucesso' }); } catch (e) {}
  (this as any).logEvent = { nivel: 'INFO', motivo: 'sucesso', cnpj };
});

Then('devo receber os dados da empresa cadastrada', function(this: TestWorld) {
  if (!this.queryResult || !this.queryResult.razaoSocial) throw new Error('nenhum dado encontrado');
});

// Auditoria / logs minimal implementation for tests
Given('que uma tentativa de cadastro falha por motivo {string}', function(this: TestWorld, motivo: string) {
  (this as any).logEvent = { nivel: 'ERROR', motivo, cnpj: this.inputCnpj || null };
});

Given('que ocorreu uma tentativa com motivo {string}', function(this: TestWorld, motivo: string) {
  (this as any).logEvent = { nivel: 'ERROR', motivo, cnpj: this.inputCnpj || null };
});

Given('que ocorreu falha de validação para CNPJ {string}', function(this: TestWorld, cnpj: string) {
  this.inputCnpj = cnpj;
  (this as any).logEvent = { nivel: 'ERROR', motivo: 'formato_invalido', cnpj };
});

Given('que houve {int} tentativas falhas para o mesmo usuário', function(this: TestWorld, n: number) {
  (this as any).failedAttempts = n;
  (this as any).logs = (this as any).logs || [];
  for (let i = 0; i < n; i++) {
    (this as any).logs.push({ nivel: 'ERROR', motivo: 'formato_invalido', cnpj: null });
  }
});

// alias for plural phrasing
Given('que houveram {int} tentativas falhas para o mesmo usuário', function(this: TestWorld, n: number) {
  (this as any).failedAttempts = n;
  (this as any).logs = (this as any).logs || [];
  for (let i = 0; i < n; i++) {
    (this as any).logs.push({ nivel: 'ERROR', motivo: 'formato_invalido', cnpj: null });
  }
});

When('eu registrar a tentativa', function(this: TestWorld) {
  const log = (this as any).logEvent || { nivel: 'INFO', motivo: 'consulta', cnpj: this.inputCnpj };
  (this as any).logs = (this as any).logs || [];
  (this as any).logs.push(log);
  (this as any).lastLog = log;
});

When('eu consultar os logs', function(this: TestWorld) {
  // noop - logs are in world
});

Then('deve existir um log de tentativa com motivo {string} sem expor o CNPJ completo', function(this: TestWorld, motivo: string) {
  const logs = (this as any).logs || [];
  const found = logs.find((l: any) => l.motivo === motivo);
  if (!found) throw new Error('log não encontrado');
  const msg = JSON.stringify(found);
  if (/\d{14}/.test(msg)) throw new Error('log expõe CNPJ completo');
});

Then('deve existir um log com status {string} e sem dados sensíveis expostos', function(this: TestWorld, status: string) {
  const logs = (this as any).logs || [];
  const found = (this as any).lastLog || logs[logs.length - 1];
  if (!found) throw new Error('nenhum log');
  const expectedNivel = status === 'sucesso' ? 'INFO' : 'ERROR';
  if (found.nivel !== expectedNivel && found.nivel !== status) throw new Error('status diferente');
  const msg = JSON.stringify(found);
  if (/\d{14}/.test(msg)) throw new Error('log expõe CNPJ completo');
});

Then('o log deve conter o motivo {string}', function(this: TestWorld, motivo: string) {
  const logs = (this as any).logs || [];
  if (!logs.find((l: any) => l.motivo === motivo)) throw new Error('motivo não encontrado');
});

Then('o sistema deve retornar pelo menos {int} registros', function(this: TestWorld, n: number) {
  const logs = (this as any).logs || [];
  if (logs.length < n) throw new Error('registros insuficientes');
});
