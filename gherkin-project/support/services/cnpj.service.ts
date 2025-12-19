export class CnpjService {
  normalize(cnpj: string): string {
    if (!cnpj) return '';
    return cnpj.replace(/\D/g, '');
  }

  isValidFormat(cnpj: string): boolean {
    const n = this.normalize(cnpj);
    return /^[0-9]{14}$/.test(n);
  }

  private calcDV(numbers: string): number {
    let sum = 0;
    const length = numbers.length;
    const weights = length === 12 ? [5,4,3,2,9,8,7,6,5,4,3,2] : [6,5,4,3,2,9,8,7,6,5,4,3,2];
    for (let i = 0; i < length; i++) {
      sum += parseInt(numbers.charAt(i), 10) * weights[i];
    }
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  }

  isValidDV(cnpj: string): boolean {
    const n = this.normalize(cnpj);
    if (n.length !== 14) return false;
    const base = n.substring(0, 12);
    const dv1 = this.calcDV(base);
    const dv2 = this.calcDV(base + dv1.toString());
    return n.charAt(12) === String(dv1) && n.charAt(13) === String(dv2);
  }

  validate(cnpj: string): { ok: boolean; reason?: string } {
    if (!cnpj || cnpj.trim() === '') return { ok: false, reason: 'formato inválido' };
    if (!this.isValidFormat(cnpj)) return { ok: false, reason: 'formato inválido' };
    if (!this.isValidDV(cnpj)) return { ok: false, reason: 'DV inválido' };
    return { ok: true };
  }
}
