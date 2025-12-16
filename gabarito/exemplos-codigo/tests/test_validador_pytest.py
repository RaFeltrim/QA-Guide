import pytest

from gabarito.exemplos_codigo.validador_cnpj import validar_cnpj


@pytest.mark.parametrize(
    "cnpj,expected",
    [
        ("11.222.333/0001-81", True),
        ("11222333000181", True),
        ("12.345.678/0002-95", True),
        ("11.222.333/0001-00", False),
        ("00.000.000/0000-00", False),
        ("11.222.333/0001-8", False),
        ("", False),
        (None, False),
    ],
)
def test_validar_cnpj_parametrizado(cnpj, expected):
    assert validar_cnpj(cnpj) is expected


def test_transposed_digits():
    # Troca de ordem que altera DVs
    assert not validar_cnpj('11.222.333/0010-81')


def test_dv_resto_zero_or_one():
    # Exemplo onde resto pode ser 0/1: usar um caso com DV 0
    assert validar_cnpj('00.000.000/0001-91')
