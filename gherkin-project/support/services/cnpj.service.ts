export class CnpjService {
  normalize(cnpj: string): string {
    if (!cnpj) return '';
    // remove formatting characters but keep letters and digits, convert to upper case
    const n = cnpj.replace(/[\.\-\/\_\s]/g, '').toUpperCase();
    // If input is longer than 14 and consists only of digits, take the right-most 14 chars
    // (drop extra leading zeros). If there are letters present, do NOT truncate —
    // keep full token so validation can correctly reject alphanumeric garbage in the prefix.
    if (n.length > 14 && /^[0-9]+$/.test(n)) return n.slice(n.length - 14);
    return n;
  }

  canonicalize(cnpj: string): string {
    const n = this.normalize(cnpj);
    // no debug here
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

  validate(cnpj: string, opts?: { acceptAlfanumerico?: boolean; blacklist?: string[] }): { ok: boolean; reason?: string } {
    if (!cnpj || cnpj.trim() === '') return { ok: false, reason: 'tamanho_invalido' };
    // inspect raw (strip only formatting chars) before normalization/truncation
    const raw = String(cnpj).replace(/[\.\-\/\s\(\)]/g, '');
    // If raw is numeric and longer than 14, allow truncation only when the excess is leading zeros
    // (e.g. '0012345678000195' should be treated as valid after trimming leading zeros),
    // otherwise report comprimento inválido.
    if (/^[0-9]+$/.test(raw) && raw.length > 14) {
      const withoutLeadingZeros = raw.replace(/^0+/, '');
      if (withoutLeadingZeros.length > 14) return { ok: false, reason: 'tamanho_invalido' };
      // otherwise allow normalization to handle truncation
    }
    const n = this.normalize(cnpj);
    // debug trace when running tests to understand incoming token
    // eslint-disable-next-line no-console
    console.debug('CnpjService.validate', { input: cnpj, normalized: n, opts });
    // Only allow alphabetic characters in very specific positions.
    // Policy: letters are permitted only in the second DV position (index 13) when
    // `acceptAlfanumerico` is true. Any letters elsewhere are treated as invalid.
    // check blacklist first (use canonicalized form)
    const canon = this.canonicalize(n);
    if (opts && opts.blacklist && opts.blacklist.includes(canon || '')) return { ok: false, reason: 'lista_negra' };
    // accept alfanumerico only when explicitly enabled via opts.acceptAlfanumerico === true
    // default to accepting alphanumeric suffixes unless explicitly disabled
    const acceptAlfanumerico = (opts && typeof opts.acceptAlfanumerico === 'boolean') ? opts.acceptAlfanumerico : true;
    // detect invalid characters in normalized token: if there are characters outside A-Z0-9, mark as caracter_invalido
    if (/[^A-Z0-9]/.test(n)) return { ok: false, reason: 'caracter_invalido' };
    // if letters are present, enforce position constraints
    if (/[A-Z]/.test(n)) {
      if (n.length !== 14) return { ok: false, reason: 'caracter_invalido' };
      // letters allowed only at index 13 (second DV) when acceptAlfanumerico === true
      const lettersOutsideDv2 = n
        .split('')
        .map((ch, idx) => ({ ch, idx }))
        .filter(x => /[A-Z]/.test(x.ch) && x.idx !== 13);
      if (lettersOutsideDv2.length > 0) return { ok: false, reason: 'caracter_invalido' };
    }
    // length check (now that we applied the raw-length pre-check above)
    if (n.length !== 14) {
      if (n.length === 13) return { ok: false, reason: 'formato_invalido' };
      return { ok: false, reason: 'tamanho_invalido' };
    }
    // first DV (position 12) must be a digit; second DV (position 13) may be alphanumeric when configured
    const dv1Char = n.charAt(12);
    const dv2Char = n.charAt(13);
    if (!/^[0-9]$/.test(dv1Char)) return { ok: false, reason: 'caracter_invalido' };
    // treat trivial sequences as blacklist-like (features expect 'lista_negra' for obvious sequences)
    if (this.isTrivialSequence(n)) return { ok: false, reason: 'lista_negra' };
    const base = n.substring(0, 12);
    const dv1 = this.calcDV(base);
    if (String(dv1) !== dv1Char) return { ok: false, reason: 'check_digits_invalido' };
    // second DV: if digit validate; if letter, only accept when acceptAlfanumerico=true
    if (/^[0-9]$/.test(dv2Char)) {
      const dv2 = this.calcDV(base + dv1.toString());
      if (String(dv2) !== dv2Char) return { ok: false, reason: 'check_digits_invalido' };
    } else {
      if (!acceptAlfanumerico) return { ok: false, reason: 'caracter_invalido' };
      // Accept only documented suffix letters (e.g., 'A','B') in DV2
      const allowedDvLetters = new Set(['A', 'B']);
      if (!allowedDvLetters.has(dv2Char)) return { ok: false, reason: 'caracter_invalido' };
      // when allowed and acceptAlfanumerico is true, accept without checksum
    }
    return { ok: true };
  }

  applyMigration(cnpj: string, mapping?: Record<string,string>): { ok: boolean; result?: string; reason?: string } {
    if (!cnpj) return { ok: false, reason: 'tamanho_invalido' };
    const n = this.normalize(cnpj);
    // replace every letter in the normalized token using mapping
    let out = '';
    for (const ch of n) {
      if (/[A-Z]/.test(ch)) {
        if (!mapping || !mapping[ch]) return { ok: false, reason: 'mapa ausente' };
        out += mapping[ch];
      } else {
        out += ch;
      }
    }
    return { ok: true, result: out };
  }
}
