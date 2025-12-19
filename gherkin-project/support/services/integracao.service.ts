import { CnpjService } from './cnpj.service';

type ExternalRecord = { razaoSocial: string } | null;

export class IntegracaoService {
  private externalStore: Map<string, ExternalRecord> = new Map();
  private cnpjService = new CnpjService();

  setExternalData(cnpj: string, data: ExternalRecord) {
    const n = this.cnpjService.normalize(cnpj);
    this.externalStore.set(n, data);
  }

  async consultarExterno(cnpj: string, mode: 'sucesso' | 'timeout' | 'indisponivel' = 'sucesso') {
    const n = this.cnpjService.normalize(cnpj);
    if (!this.cnpjService.isValidFormat(cnpj)) throw new Error('CNPJ inválido');
    if (mode === 'timeout') {
      await new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 1500));
    }
    if (mode === 'indisponivel') throw new Error('indisponivel');
    const data = this.externalStore.get(n) || null;
    if (!data) throw new Error('nao encontrado');
    return data;
  }
}
