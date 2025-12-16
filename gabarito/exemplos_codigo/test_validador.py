import pytest
from gabarito.exemplos_codigo.validador_cnpj import is_valid_cnpj

@pytest.mark.parametrize("cnpj,expected", [
    ("04.252.011/0001-10", True),
    ("40.688.134/0001-61", True),
    ("12.345.678/9012-34", False),
    ("00000000000000", False),
    ("", False),
])
def test_cnpjs(cnpj, expected):
    assert is_valid_cnpj(cnpj) == expected
