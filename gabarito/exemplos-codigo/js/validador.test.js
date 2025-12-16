const { validarCnpjBasico, normalizar } = require('./validador');

test.each([
  ['11.222.333/0001-81', true],
  ['11222333000181', true],
  ['11.222.333/0001-8', false],
  ['', false],
  [null, false]
])('validarCnpjBasico(%s) => %s', (input, expected) => {
  expect(validarCnpjBasico(input)).toBe(expected);
});

test('normalizar remove caracteres não numéricos', () => {
  expect(normalizar('11.222.333/0001-81')).toBe('11222333000181');
});
