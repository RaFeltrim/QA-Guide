import { CnpjService } from './cnpj.service';

interface Company { cnpj: string; razaoSocial: string; status: string }

export class EmpresaService {
  private store: Map<string, Company> = new Map();
  private cnpjService = new CnpjService();

  reset() {
    this.store.clear();
  }

  createCompany(input: { cnpj: string; razaoSocial: string }) {
    const cnpjNorm = this.cnpjService.normalize(input.cnpj || '');
    if (!cnpjNorm || !input.cnpj || !input.razaoSocial) throw new Error('campos obrigatórios');
    // validate the normalized token to avoid discrepancies caused by formatting
    const validation = this.cnpjService.validate(cnpjNorm);
    if (!validation.ok) throw new Error(validation.reason || 'formato_invalido');
    // store using canonicalized form (consistent 14-digit key when applicable)
    const canon = this.cnpjService.canonicalize(cnpjNorm) || cnpjNorm;
    if (this.store.has(canon)) throw new Error('duplicidade');
    const company: Company = { cnpj: canon, razaoSocial: input.razaoSocial, status: 'ativo' };
    this.store.set(canon, company);
    return { ok: true, company };
  }

  removeCompany(cnpj: string) {
    const canon = this.cnpjService.canonicalize(cnpj || '');
    if (this.store.has(canon)) this.store.delete(canon);
  }

  // Test helper: force insert a company bypassing validation (used by step definitions to prepare state)
  forceInsertCompany(input: { cnpj: string; razaoSocial: string }) {
    const cnpjNorm = this.cnpjService.normalize(input.cnpj || '');
    const canon = this.cnpjService.canonicalize(cnpjNorm) || cnpjNorm;
    const company: Company = { cnpj: canon, razaoSocial: input.razaoSocial, status: 'ativo' };
    this.store.set(canon, company);
    return { ok: true, company };
  }

  getCompanyByCnpj(cnpj: string) {
    const canon = this.cnpjService.canonicalize(cnpj || '');
    if (!canon) return null;
    const c = this.store.get(canon);
    if (!c) return null;
    // return masked cnpj to avoid exposing (use CnpjService.maskPublic)
    return { cnpj: this.cnpjService.maskPublic(c.cnpj), razaoSocial: c.razaoSocial, status: c.status };
  }
}

export const empresaService = new EmpresaService();
