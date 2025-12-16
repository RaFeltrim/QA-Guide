# Validador de CNPJ (implementação)

def _only_digits(s: str) -> str:
    return ''.join(ch for ch in (s or '') if ch.isdigit())

def _all_equal(s: str) -> bool:
    return all(ch == s[0] for ch in s)

def _calc_dv(numbers: list[int], weights: list[int]) -> int:
    s = sum(n * w for n, w in zip(numbers, weights))
    r = s % 11
    return 0 if r < 2 else 11 - r

def validar_cnpj(cnpj: str) -> bool:
    """Valida um CNPJ. Retorna True se válido, False caso contrário.

    Regras:
    - Normaliza para dígitos
    - Deve ter 14 dígitos
    - Não pode ser sequência de dígitos iguais
    - Verifica dois dígitos verificadores pelo algoritmo módulo 11
    """
    n = _only_digits(cnpj)
    if len(n) != 14:
        return False
    if _all_equal(n):
        return False

    nums = [int(ch) for ch in n]
    base = nums[:12]

    w1 = [5,4,3,2,9,8,7,6,5,4,3,2]
    dv1 = _calc_dv(base, w1)
    if dv1 != nums[12]:
        return False

    base2 = base + [dv1]
    w2 = [6,5,4,3,2,9,8,7,6,5,4,3,2]
    dv2 = _calc_dv(base2, w2)
    if dv2 != nums[13]:
        return False

    return True

if __name__ == '__main__':
    sample = '11.222.333/0001-81'
    print(sample, validar_cnpj(sample))
