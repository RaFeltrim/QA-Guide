import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { CnpjService } from '../support/services/cnpj.service';
import { TestWorld } from '../support/world';

setDefaultTimeout(10 * 1000);

const cnpjService = new CnpjService();

// Given with type: formatado | normalizado | alfanumerico
Given('que foi informado o CNPJ {word} {string}', function(this: TestWorld, tipo: string, cnpj: string) {
  this.inputType = tipo; // store type for clarity
  this.inputCnpj = cnpj;
});

// Alternate phrasings used in consolidated features
Given('que foi informado o CNPJ {string}', function(this: TestWorld, cnpj: string) {
  this.inputType = 'unknown';
  this.inputCnpj = cnpj;
});

// NOTE: avoid an ambiguous overload for the `formatado` phrasing; the generic
// `que foi informado o CNPJ {word} {string}` covers typed inputs such as
// `formatado`, `normalizado` and `alfanumerico`.

Given('que foi informado o CNPJ normalizado {string}', function(this: TestWorld, cnpj: string) {
  this.inputType = 'normalizado';
  this.inputCnpj = cnpj;
});

When('o cliente validar o CNPJ informado', function(this: TestWorld) {
  this.validationResult = cnpjService.validate(this.inputCnpj || '');
});

Then('a validação deve ser bem sucedida', function(this: TestWorld) {
  if (!this.validationResult) throw new Error('nenhum resultado');
  if (!this.validationResult.ok) throw new Error('esperado válido');
});

Then('a validação deve falhar com motivo {string}', function(this: TestWorld, motivo: string) {
  if (!this.validationResult) throw new Error('nenhum resultado');
  if (this.validationResult.ok) throw new Error('esperado inválido');
  if (this.validationResult.reason !== motivo) throw new Error(`motivo esperado ${motivo} mas foi ${this.validationResult.reason}`);
});

When('o cliente normalizar o CNPJ informado', function(this: TestWorld) {
  this.lastNormalized = cnpjService.normalize(this.inputCnpj || '');
});

When('o cliente canonicalizar o CNPJ informado', function(this: TestWorld) {
  this.lastCanonical = cnpjService.canonicalize(this.inputCnpj || '');
});

Then('a normalização deve resultar em {string}', function(this: TestWorld, esperado: string) {
  if (this.lastNormalized !== esperado) throw new Error(`esperado ${esperado} mas foi ${this.lastNormalized}`);
});

Then('o resultado da canonicalização deve ser {string}', function(this: TestWorld, esperado: string) {
  if ((this.lastCanonical || '') !== esperado) throw new Error(`esperado ${esperado} mas foi ${this.lastCanonical}`);
});

Then('o resultado da validação deve ser {string}', function(this: TestWorld, esperado: string) {
  if (!this.validationResult) throw new Error('nenhum resultado');
  const ok = this.validationResult.ok === true;
  if (esperado === 'válido' && !ok) throw new Error('esperado válido');
  if (esperado === 'inválido' && ok) throw new Error('esperado inválido');
});

// equivalência
Given('o primeiro CNPJ é {string} e o segundo CNPJ é {string}', function(this: TestWorld, a: string, b: string) {
  this.a = a; this.b = b;
});

// allow feature phrasing with leading 'que '
Given('que o primeiro CNPJ é {string} e o segundo CNPJ é {string}', function(this: TestWorld, a: string, b: string) {
  this.a = a; this.b = b;
});

When('o cliente normalizar ambos os CNPJs', function(this: TestWorld) {
  this.aNorm = cnpjService.normalize(this.a || '');
  this.bNorm = cnpjService.normalize(this.b || '');
});

Then('ambos devem ser equivalentes', function(this: TestWorld) {
  if (this.aNorm !== this.bNorm) throw new Error('não equivalentes');
});

Then('a normalização deve resultar em conter {string}', function(this: TestWorld, fragment: string) {
  if (!this.lastNormalized) throw new Error('nenhum resultado');
  if (!this.lastNormalized.includes(fragment)) throw new Error('fragmento não encontrado');
});

Then('o resultado deve ser válido', function(this: TestWorld) {
  if (!this.validationResult) throw new Error('nenhum resultado');
  if (!this.validationResult.ok) throw new Error('esperado válido');
});

Then('o resultado deve ser inválido', function(this: TestWorld) {
  if (!this.validationResult) throw new Error('nenhum resultado');
  if (this.validationResult.ok) throw new Error('esperado inválido');
});

// Masking / public response
Given('existe empresa cadastrada com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  // reuse EmpresaService from support if needed; simple store in world for mask testing
  this.registeredCompany = { cnpj, razaoSocial: razao };
});

When('o cliente solicitar os dados públicos da empresa', function(this: TestWorld) {
  if (!this.registeredCompany) { this.publicResponse = null; return; }
  this.publicResponse = { cnpj: cnpjService.maskPublic(this.registeredCompany.cnpj), razaoSocial: this.registeredCompany.razaoSocial };
});

Then('o CNPJ retornado deve ser {string}', function(this: TestWorld, esperado: string) {
  if (!this.publicResponse) throw new Error('nenhuma resposta pública');
  if (this.publicResponse.cnpj !== esperado) throw new Error(`esperado ${esperado} mas foi ${this.publicResponse.cnpj}`);
});
