function normalizar(cnpj) {
  return (cnpj || '').toString().replace(/\D/g, '');
}

function validarCnpjBasico(cnpj) {
  const n = normalizar(cnpj);
  return n.length === 14;
}

module.exports = { normalizar, validarCnpjBasico };
