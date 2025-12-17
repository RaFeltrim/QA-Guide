describe('Carrinho — fluxo básico', () => {
  it('adiciona item ao carrinho e mostra subtotal', () => {
    cy.visit('/');
    cy.get('[data-cy=product-0-add]').click();
    cy.get('[data-cy=cart-link]').click();
    cy.get('[data-cy=cart-items]').should('contain', '1 item');
    cy.get('[data-cy=cart-subtotal]').should('match', /\d+,?\d*/);
  });
});
