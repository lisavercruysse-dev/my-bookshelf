describe('General', () => {
  it('draait de applicatie', () => {
    cy.visit('http://localhost:5173');
    cy.get('title').should('exist');
  });

  it('should login', () => {
    cy.login('bob.callahan@example.com', 'example1');
  });
});