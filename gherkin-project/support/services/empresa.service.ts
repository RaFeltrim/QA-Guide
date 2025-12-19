import { CnpjService } from './cnpj.service';

interface Company { cnpj: string; razaoSocial: string; status: string }

export class EmpresaService {
  private store: Map<string, Company> = new Map();
  private cnpjService = new CnpjService();

  createCompany(input: { cnpj: string; razaoSocial: string }) {
    const cnpjNorm = this.cnpjService.normalize(input.cnpj || '');
    if (!cnpjNorm || !input.cnpj || !input.razaoSocial) throw new Error('campos obrigatórios');
    const validation = this.cnpjService.validate(input.cnpj);
    if (!validation.ok) throw new Error('CNPJ inválido');
    if (this.store.has(cnpjNorm)) throw new Error('duplicidade');
    const company: Company = { cnpj: cnpjNorm, razaoSocial: input.razaoSocial, status: 'ativo' };
    this.store.set(cnpjNorm, company);
    return { ok: true, company };
  }

  getCompanyByCnpj(cnpj: string) {
    const cnpjNorm = this.cnpjService.normalize(cnpj || '');
    if (!cnpjNorm) return null;
    const c = this.store.get(cnpjNorm);
    if (!c) return null;
    // return masked cnpj to avoid exposing
    return { cnpj: c.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'), razaoSocial: c.razaoSocial, status: c.status };
  }
}
