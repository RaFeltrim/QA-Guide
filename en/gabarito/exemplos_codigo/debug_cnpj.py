from gabarito.exemplos_codigo.validador_cnpj import clean_cnpj, calc_digit

def debug(cnpj):
    c = clean_cnpj(cnpj)
    print('clean:', c)
    nums = [int(ch) for ch in c]
    first_multipliers = [5,4,3,2,9,8,7,6,5,4,3,2]
    second_multipliers = [6] + first_multipliers
    print('nums:', nums)
    d1 = calc_digit(nums[:12], first_multipliers)
    print('d1:', d1)
    d2 = calc_digit(nums[:12] + [d1], second_multipliers)
    print('d2:', d2)

if __name__ == '__main__':
    debug('12.345.678/0002-95')
