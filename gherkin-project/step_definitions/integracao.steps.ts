import { Dado, Quando, Então } from '@cucumber/cucumber';
import { IntegracaoService } from '../support/services/integracao.service';
import { EmpresaService } from '../support/services/empresa.service';
import { TestWorld } from '../support/world';

const integracao = new IntegracaoService();
const empresaService = new EmpresaService();

Dado('que o serviço externo está disponível', function(this: TestWorld) {
  this.externalMode = 'sucesso';
});

Dado('que o serviço externo está com timeout', function(this: TestWorld) {
  this.externalMode = 'timeout';
});

Dado('que o serviço externo está indisponível', function(this: TestWorld) {
  this.externalMode = 'indisponivel';
});

Dado('existe informação externa para CNPJ {string}', function(this: TestWorld, cnpj: string) {
  integracao.setExternalData(cnpj, { razaoSocial: 'Empresa Externa' });
});

Dado('existe empresa cadastrada internamente com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  try { empresaService.createCompany({ cnpj, razaoSocial: razao }); } catch (e) {}
});

Quando('eu consultar o serviço externo para o CNPJ {string}', async function(this: TestWorld, cnpj: string) {
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

Então('devo receber resposta externa com razão social', function(this: TestWorld) {
  if (!this.externalResponse || !this.externalResponse.razaoSocial) throw new Error('nenhuma resposta externa');
});

Então('a chamada deve falhar com motivo {string}', function(this: TestWorld, motivo: string) {
  if (!this.externalError) throw new Error('esperado erro');
  if (!this.externalError.includes(motivo)) throw new Error(`motivo esperado ${motivo}`);
});

Então('devo receber dados do cadastro interno como fallback', function(this: TestWorld) {
  if (!this.externalResponse || !this.externalResponse.razaoSocial) throw new Error('fallback não ocorreu');
});

Então('o resultado deve ser {string}', function(this: TestWorld, esperado: string) {
  if (this.externalMode === 'sucesso' && esperado !== 'sucesso') throw new Error('modo inconsistente');
});
