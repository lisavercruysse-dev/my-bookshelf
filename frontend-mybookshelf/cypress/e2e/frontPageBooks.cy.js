describe('Book list', () => {
  it('should show the popular books', () => {
    cy.intercept(
      'GET',
      'http://localhost:3000/api/books/popular',
      {fixture: 'frontPageBooks.json'},
    );

    cy.visit('http://localhost:5173');
    cy.get('[data-cy=book]').should('have.length', 5);
  });

  it('should show a loading indicator for a very slow response', () => {
    cy.intercept(
      'http://localhost:5173',
      (req) => {
        req.on('response', (res) => {
          res.setDelay(1000);
        });
      },
    ).as('slowResponse');
    cy.visit('http://localhost:5173');
    cy.get('[data-cy=loader]').should('be.visible');
    cy.wait('@slowResponse');
    cy.get('[data-cy=loader]').should('not.exist');
  });
});