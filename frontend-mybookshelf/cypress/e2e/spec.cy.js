describe('General', () => {
  it('runs application', () => {
    cy.visit('http://localhost:5173');
    cy.get('h1').should('exist');
  });
});