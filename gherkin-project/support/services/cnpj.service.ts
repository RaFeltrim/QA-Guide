export class CnpjService {
  normalize(cnpj: string): string {
    if (!cnpj) return '';
    // remove formatting characters but keep letters and digits, convert to upper case
    const n = cnpj.replace(/[\.\-\/\_\s]/g, '').toUpperCase();
    // If input contains only A-Z0-9 and is longer than 14, take the right-most 14 chars
    // (drop extra leading zeros/garbage). If there are non-alphanumeric characters
    // (e.g. symbols) preserve the full normalized string so callers can detect invalid chars.
    if (n.length > 14 && /^[A-Z0-9]+$/.test(n)) return n.slice(n.length - 14);
    return n;
  }

  canonicalize(cnpj: string): string {
    const n = this.normalize(cnpj);
    if (!n) return '';
    // If longer than 14 take the right-most 14 characters (drop extra leading zeros/garbage)
    if (n.length > 14) return n.slice(n.length - 14);
    // otherwise return as-is (preserve short inputs for validation to catch length issues)
    return n;
  }

  isValidFormat(cnpj: string): boolean {
    const n = this.normalize(cnpj);
    // accept alphanumeric token of length 14 (A-Z, 0-9)
    return /^[A-Z0-9]{14}$/.test(n);
  }

  private calcDV(numbers: string): number {
    let sum = 0;
    const length = numbers.length;
    const weights = length === 12 ? [5,4,3,2,9,8,7,6,5,4,3,2] : [6,5,4,3,2,9,8,7,6,5,4,3,2];
    for (let i = 0; i < length; i++) {
      const ch = numbers.charAt(i);
      // map character to numeric value: digits -> value, letters -> ASCII code
      const value = /[0-9]/.test(ch) ? parseInt(ch, 10) : ch.charCodeAt(0);
      sum += value * weights[i];
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
    // last two chars must be digits
    if (!/^[0-9]{2}$/.test(n.substring(12))) return false;
    return n.charAt(12) === String(dv1) && n.charAt(13) === String(dv2);
  }

  isTrivialSequence(cnpj: string): boolean {
    const n = this.normalize(cnpj);
    if (n.length !== 14) return false;
    // consider trivial if all 14 chars equal OR if first 12 chars are the same character
    if (/^([A-Z0-9])\1{13}$/.test(n)) return true;
    const first12 = n.substring(0, 12);
    if (/^([A-Z0-9])\1{11}$/.test(first12)) return true;
    return false;
  }

  maskPublic(cnpj: string): string {
    const n = this.normalize(cnpj);
    if (n.length !== 14) return '';
    // keep letters and digits grouped, mask last 2 (DVs)
    const p1 = n.substring(0,2);
    const p2 = n.substring(2,5);
    const p3 = n.substring(5,8);
    const p4 = n.substring(8,12);
    return `${p1}.${p2}.${p3}/${p4}-**`;
  }

  validate(cnpj: string): { ok: boolean; reason?: string } {
    if (!cnpj || cnpj.trim() === '') return { ok: false, reason: 'tamanho_invalido' };
    const n = this.normalize(cnpj);
    // length check
    if (n.length !== 14) return { ok: false, reason: 'tamanho_invalido' };
    // allowed characters A-Z and 0-9
    if (!/^[A-Z0-9]{14}$/.test(n)) return { ok: false, reason: 'caracter_invalido' };
    // first DV (position 13) must be a digit; second DV (position 14) may be digit or letter
    const dv1Char = n.charAt(12);
    const dv2Char = n.charAt(13);
    if (!/^[0-9]$/.test(dv1Char)) return { ok: false, reason: 'caracter_invalido' };
    if (this.isTrivialSequence(n)) return { ok: false, reason: 'sequencia_invalida' };
    const base = n.substring(0, 12);
    const dv1 = this.calcDV(base);
    if (String(dv1) !== dv1Char) return { ok: false, reason: 'check_digits_invalido' };
    // If second DV is digit, validate it; otherwise accept alphanumeric DV as allowed suffix
    if (/^[0-9]$/.test(dv2Char)) {
      const dv2 = this.calcDV(base + dv1.toString());
      if (String(dv2) !== dv2Char) return { ok: false, reason: 'check_digits_invalido' };
    }
    return { ok: true };
  }
}
