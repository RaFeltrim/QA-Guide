describe('Orders — histórico', () => {
  it('exibe histórico de pedidos do usuário', () => {
    cy.visit('/login');
    cy.get('[data-cy=email]').type('ana.qa+teste@example.com');
    cy.get('[data-cy=password]').type('SenhaForte123!');
    cy.get('[data-cy=submit]').click();
    cy.visit('/orders');
    cy.get('[data-cy=orders-list]').should('exist');
  });
});
