import { Then } from '@cucumber/cucumber';
import { TestWorld } from '../support/world';

Then('o resultado deve ser {string}', function(this: TestWorld, esperado: string) {
  // handle validationResult expectations: 'valido'/'inválido' variants
  const esperadoNorm = (esperado || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  if (this.validationResult != null) {
    if (esperadoNorm === 'valido') {
      if (!this.validationResult.ok) throw new Error('esperado válido');
      return;
    }
    if (esperadoNorm === 'invalido') {
      if (this.validationResult.ok) throw new Error('esperado inválido');
      return;
    }
  }
  // Prioridade: normalização, integração, criação (cadastro)
  if (this.lastNormalized !== undefined) {
    if ((this.lastNormalized || '') !== esperado) throw new Error(`esperado ${esperado} mas foi ${(this.lastNormalized||'')}`);
    return;
  }

  if (this.externalMode !== undefined) {
    if (esperado !== this.externalMode) throw new Error(`modo esperado ${esperado} mas foi ${this.externalMode}`);
    return;
  }

  if (this.createResult !== undefined || this.createError !== undefined) {
    if (esperado === 'sucesso') {
      if (!this.createResult || !this.createResult.ok) throw new Error('esperado sucesso');
      return;
    }
    // if createError exists, check its message
    if (this.createError && String(this.createError).includes(esperado)) return;
    // otherwise, if createResult exists, inspect it or fail
    if (this.createResult !== undefined) {
      if (this.createResult && this.createResult.ok && esperado === 'sucesso') return;
      throw new Error(`resultado inesperado: ${JSON.stringify(this.createResult)}`);
    }
    throw new Error(`resultado inesperado: ${JSON.stringify(this.createError)}`);
  }

  throw new Error('nenhum resultado a ser validado');
});

Then('o resultado deve conter {string}', function(this: TestWorld, fragment: string) {
  if (this.lastNormalized === undefined) throw new Error('nenhum resultado de normalização');
  if (!this.lastNormalized || !this.lastNormalized.includes(fragment)) throw new Error('fragmento não encontrado');
});
