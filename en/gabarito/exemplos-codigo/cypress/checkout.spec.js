describe('Checkout — fluxo básico', () => {
  it('finaliza compra com cartão de teste', () => {
    cy.visit('/cart');
    cy.get('[data-cy=checkout-button]').click();
    cy.get('[data-cy=card-number]').type('4242424242424242');
    cy.get('[data-cy=card-exp]').type('12/34');
    cy.get('[data-cy=card-cvc]').type('123');
    cy.get('[data-cy=submit-payment]').click();
    cy.url().should('include', '/orders/');
    cy.get('[data-cy=order-status]').should('contain', 'Pago');
  });
});
