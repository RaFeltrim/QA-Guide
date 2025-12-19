import { Dado, Quando, Então } from '@cucumber/cucumber';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { CnpjService } from '../support/services/cnpj.service';
import { TestWorld } from '../support/world';

setDefaultTimeout(10 * 1000);

const cnpjService = new CnpjService();

Dado('que o CNPJ informado é {string}', function(this: TestWorld, cnpj: string) {
  this.inputCnpj = cnpj;
});

Quando('eu validar o CNPJ', function(this: TestWorld) {
  this.lastResult = cnpjService.validate(this.inputCnpj || '');
});

Então('o resultado deve ser válido', function(this: TestWorld) {
  if (!this.lastResult) throw new Error('nenhum resultado');
  if (!this.lastResult.ok) throw new Error('esperado válido');
});

Então('o resultado deve ser inválido com motivo {string}', function(this: TestWorld, motivo: string) {
  if (!this.lastResult) throw new Error('nenhum resultado');
  if (this.lastResult.ok) throw new Error('esperado inválido');
  if (this.lastResult.reason !== motivo) throw new Error(`motivo esperado ${motivo} mas foi ${this.lastResult.reason}`);
});

Quando('eu normalizar o CNPJ', function(this: TestWorld) {
  this.lastNormalized = cnpjService.normalize(this.inputCnpj || '');
});

Então('o resultado deve ser {string}', function(this: TestWorld, esperado: string) {
  if ((this.lastNormalized || '') !== esperado) throw new Error(`esperado ${esperado} mas foi ${(this.lastNormalized||'')}`);
});

Então('o resultado deve conter {string}', function(this: TestWorld, fragment: string) {
  if (!this.lastNormalized) throw new Error('nenhum resultado');
  if (!this.lastNormalized.includes(fragment)) throw new Error('fragmento não encontrado');
});

// equivalência
Dado('o primeiro CNPJ é {string} e o segundo CNPJ é {string}', function(this: TestWorld, a: string, b: string) {
  this.a = a; this.b = b;
});

Quando('eu normalizar ambos os CNPJs', function(this: TestWorld) {
  this.aNorm = cnpjService.normalize(this.a || '');
  this.bNorm = cnpjService.normalize(this.b || '');
});

Então('ambos devem ser equivalentes', function(this: TestWorld) {
  if (this.aNorm !== this.bNorm) throw new Error('não equivalentes');
});
