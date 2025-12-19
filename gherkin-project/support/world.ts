import { setWorldConstructor } from '@cucumber/cucumber';

export type ExternalMode = 'sucesso' | 'timeout' | 'indisponivel';

export class TestWorld {
  inputCnpj?: string;
  lastResult?: { ok: boolean; reason?: string } | null;
  lastNormalized?: string;
  a?: string; b?: string; aNorm?: string; bNorm?: string;
  createResult?: any; createError?: any; queryResult?: any;
  externalMode?: ExternalMode; externalResponse?: any; externalError?: any;

  reset() {
    this.inputCnpj = undefined;
    this.lastResult = null;
    this.lastNormalized = undefined;
    this.a = this.b = this.aNorm = this.bNorm = undefined;
    this.createResult = this.createError = this.queryResult = undefined;
    this.externalMode = undefined; this.externalResponse = undefined; this.externalError = undefined;
  }
}

setWorldConstructor(TestWorld);

export { TestWorld as World };
