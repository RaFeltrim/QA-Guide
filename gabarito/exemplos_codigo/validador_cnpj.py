import re

def clean_cnpj(cnpj: str) -> str:
    return re.sub(r"\D", "", cnpj or "")

def calc_digit(cnpj_numbers: list[int], multipliers: list[int]) -> int:
    s = sum(n * m for n, m in zip(cnpj_numbers, multipliers))
    r = s % 11
    return 0 if r < 2 else 11 - r

def is_valid_cnpj(cnpj: str) -> bool:
    c = clean_cnpj(cnpj)
    if len(c) != 14:
        return False
    if c == c[0] * 14:
        return False
    nums = [int(ch) for ch in c]
    first_multipliers = [5,4,3,2,9,8,7,6,5,4,3,2]
    second_multipliers = [6] + first_multipliers
    d1 = calc_digit(nums[:12], first_multipliers)
    d2 = calc_digit(nums[:12] + [d1], second_multipliers)
    return nums[12] == d1 and nums[13] == d2

def validar_cnpj(cnpj: str) -> bool:
    """Compatibilidade com nomes em PT: alias para is_valid_cnpj."""
    return is_valid_cnpj(cnpj)


if __name__ == '__main__':
    import sys
    if len(sys.argv) < 2:
        print('Uso: python validador_cnpj.py <CNPJ>')
        raise SystemExit(1)
    cnpj_input = sys.argv[1]
    print('Válido' if is_valid_cnpj(cnpj_input) else 'Inválido')
