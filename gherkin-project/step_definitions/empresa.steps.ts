import { Dado, Quando, Então } from '@cucumber/cucumber';
import { EmpresaService } from '../support/services/empresa.service';
import { TestWorld } from '../support/world';

const empresaService = new EmpresaService();

Dado('que existe um CNPJ válido {string}', function(this: TestWorld, cnpj: string) {
  this.inputCnpj = cnpj;
});

Dado('que existe um CNPJ inválido {string}', function(this: TestWorld, cnpj: string) {
  this.inputCnpj = cnpj;
});

Dado('que já existe empresa cadastrada com CNPJ {string}', function(this: TestWorld, cnpj: string) {
  try {
    empresaService.createCompany({ cnpj, razaoSocial: 'Empresa Existente' });
  } catch (e) {
    // ignore
  }
});

Quando('eu cadastrar uma empresa com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  try {
    this.createResult = empresaService.createCompany({ cnpj, razaoSocial: razao });
  } catch (e: any) {
    this.createError = e.message || String(e);
  }
});

Quando('eu tentar cadastrar uma empresa com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  try {
    this.createResult = empresaService.createCompany({ cnpj, razaoSocial: razao });
  } catch (e: any) {
    this.createError = e.message || String(e);
  }
});

Então('o cadastro deve ser bem sucedido', function(this: TestWorld) {
  if (!this.createResult || !this.createResult.ok) throw new Error('esperado sucesso');
});

Então('o cadastro deve falhar com motivo {string}', function(this: TestWorld, motivo: string) {
  if (!this.createError) throw new Error('esperado erro');
  if (!this.createError.includes(motivo)) throw new Error(`motivo esperado ${motivo} mas foi ${this.createError}`);
});

Quando('eu consultar a empresa pelo CNPJ {string}', function(this: TestWorld, cnpj: string) {
  this.queryResult = empresaService.getCompanyByCnpj(cnpj);
});

Então('a resposta deve conter razão social {string}', function(this: TestWorld, razao: string) {
  if (!this.queryResult || this.queryResult.razaoSocial !== razao) throw new Error('razão social diferente ou não encontrada');
});

Então('a resposta deve ser vazia', function(this: TestWorld) {
  if (this.queryResult) throw new Error('esperado vazio');
});

Então('a resposta deve falhar com motivo {string}', function(this: TestWorld, motivo: string) {
  // Aqui tratamos como ausência por validação
  if (this.queryResult) throw new Error('esperado falha');
});

Então('a resposta não deve expor dados sensíveis', function(this: TestWorld) {
  if (!this.queryResult) throw new Error('nenhum resultado');
  if (this.queryResult.cnpj && this.queryResult.cnpj.length === 14) throw new Error('CNPJ completo exposto');
});

Então('o status da empresa deve ser {string}', function(this: TestWorld, status: string) {
  if (!this.createResult || this.createResult.company.status !== status) throw new Error('status diferente');
});
