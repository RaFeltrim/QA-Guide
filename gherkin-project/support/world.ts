import { setWorldConstructor } from '@cucumber/cucumber';

export type ExternalMode = 'sucesso' | 'timeout' | 'indisponivel';

export class TestWorld {
  inputCnpj?: string;
  inputType?: string;
  lastResult?: { ok: boolean; reason?: string } | null;
  validationResult?: { ok: boolean; reason?: string } | null;
  lastNormalized?: string;
  lastCanonical?: string;
  a?: string; b?: string; aNorm?: string; bNorm?: string;
  createResult?: any; createError?: any; queryResult?: any;
  externalMode?: ExternalMode; externalResponse?: any; externalError?: any;
  registeredCompany?: any;
  publicResponse?: any;

  reset() {
    this.inputCnpj = undefined;
    this.inputType = undefined;
    this.lastResult = null;
    this.validationResult = null;
    this.lastNormalized = undefined;
    this.lastCanonical = undefined;
    this.a = this.b = this.aNorm = this.bNorm = undefined;
    this.createResult = this.createError = this.queryResult = undefined;
    this.externalMode = undefined; this.externalResponse = undefined; this.externalError = undefined;
    this.registeredCompany = undefined; this.publicResponse = undefined;
  }
}

setWorldConstructor(TestWorld);

export { TestWorld as World };
