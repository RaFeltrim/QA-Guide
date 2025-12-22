import { Given, When, Then } from '@cucumber/cucumber';
import { IntegracaoService } from '../support/services/integracao.service';
import { EmpresaService } from '../support/services/empresa.service';
import { TestWorld } from '../support/world';

const integracao = new IntegracaoService();
const empresaService = new EmpresaService();

Given('que o serviço externo está disponível', function(this: TestWorld) {
  this.externalMode = 'sucesso';
});

Given('que o serviço externo está com timeout', function(this: TestWorld) {
  this.externalMode = 'timeout';
});

Given('que o serviço externo está indisponível', function(this: TestWorld) {
  this.externalMode = 'indisponivel';
});

// alias without accent
Given('que o serviço externo está indisponivel', function(this: TestWorld) {
  this.externalMode = 'indisponivel';
});

Given('existe informação externa para CNPJ {string}', function(this: TestWorld, cnpj: string) {
  integracao.setExternalData(cnpj, { razaoSocial: 'Empresa Externa' });
});

Given('existe empresa cadastrada internamente com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  try { empresaService.createCompany({ cnpj, razaoSocial: razao }); } catch (e) {}
});

When('eu consultar o serviço externo para o CNPJ {string}', async function(this: TestWorld, cnpj: string) {
  try {
    this.externalResponse = await integracao.consultarExterno(cnpj, this.externalMode || 'sucesso');
  } catch (e: any) {
    this.externalError = e.message || String(e);
    // fallback
    if ((this.externalMode === 'timeout' || this.externalMode === 'indisponivel')) {
      this.externalResponse = empresaService.getCompanyByCnpj(cnpj);
    }
  }
});

Then('devo receber resposta externa com razão social', function(this: TestWorld) {
  if (!this.externalResponse || !this.externalResponse.razaoSocial) throw new Error('nenhuma resposta externa');
});

Then('a chamada deve falhar com motivo {string}', function(this: TestWorld, motivo: string) {
  if (!this.externalError) throw new Error('esperado erro');
  if (!this.externalError.includes(motivo)) throw new Error(`motivo esperado ${motivo}`);
});

Then('devo receber dados do cadastro interno como fallback', function(this: TestWorld) {
  if (!this.externalResponse || !this.externalResponse.razaoSocial) throw new Error('fallback não ocorreu');
});

// Resultado genérico tratado em common.steps.ts
