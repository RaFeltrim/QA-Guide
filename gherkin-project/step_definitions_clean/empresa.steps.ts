import { Given, When, Then } from '@cucumber/cucumber';
import { EmpresaService } from '../support/services/empresa.service';
import { CnpjService } from '../support/services/cnpj.service';
import { TestWorld } from '../support/world';

const empresaService = new EmpresaService();
const cnpjService = new CnpjService();

Given('que existe um CNPJ válido {string}', function(this: TestWorld, cnpj: string) {
  this.inputCnpj = cnpj;
});

Given('que existe um CNPJ inválido {string}', function(this: TestWorld, cnpj: string) {
  this.inputCnpj = cnpj;
});

Given('que já existe empresa cadastrada com CNPJ {string}', function(this: TestWorld, cnpj: string) {
  // Normalize input before creating to avoid validation failures for formatted inputs
  const norm = cnpjService.normalize(cnpj || '');
  try {
    empresaService.createCompany({ cnpj: norm, razaoSocial: 'Empresa Existente' });
  } catch (e) {
    // if creation fails, surface error for test clarity
    throw e;
  }
});

Given('que existe uma empresa cadastrada com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  const norm = cnpjService.normalize(cnpj || '');
  try {
    empresaService.createCompany({ cnpj: norm, razaoSocial: razao });
  } catch (e) {
    throw e;
  }
});

When('eu cadastrar uma empresa com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  try {
    this.createResult = empresaService.createCompany({ cnpj, razaoSocial: razao });
  } catch (e: any) {
    this.createError = e.message || String(e);
  }
});

When('eu tentar cadastrar uma empresa com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  try {
    this.createResult = empresaService.createCompany({ cnpj, razaoSocial: razao });
  } catch (e: any) {
    this.createError = e.message || String(e);
  }
});

Then('o cadastro deve ser bem sucedido', function(this: TestWorld) {
  if (!this.createResult || !this.createResult.ok) throw new Error('esperado sucesso');
});

Then('o cadastro deve falhar com motivo {string}', function(this: TestWorld, motivo: string) {
  if (!this.createError) throw new Error('esperado erro');
  if (!this.createError.includes(motivo)) throw new Error(`motivo esperado ${motivo} mas foi ${this.createError}`);
});

When('eu consultar a empresa pelo CNPJ {string}', function(this: TestWorld, cnpj: string) {
  this.queryResult = empresaService.getCompanyByCnpj(cnpj);
});

Then('a resposta deve conter razão social {string}', function(this: TestWorld, razao: string) {
  if (!this.queryResult || this.queryResult.razaoSocial !== razao) throw new Error('razão social diferente ou não encontrada');
});

Then('a resposta deve ser vazia', function(this: TestWorld) {
  if (this.queryResult) throw new Error('esperado vazio');
});

Then('a resposta deve falhar com motivo {string}', function(this: TestWorld, motivo: string) {
  if (this.queryResult) throw new Error('esperado falha');
});

Then('a resposta não deve expor dados sensíveis', function(this: TestWorld) {
  if (!this.queryResult) throw new Error('nenhum resultado');
  if (typeof this.queryResult.cnpj === 'string' && this.queryResult.cnpj.replace(/\D/g, '').length === 14) throw new Error('CNPJ completo exposto');
});

Then('o status da empresa deve ser {string}', function(this: TestWorld, status: string) {
  if (!this.createResult || !this.createResult.company || this.createResult.company.status !== status) throw new Error('status diferente');
});
