describe('Home', () => {
  describe('when logged out', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/books/popular', { fixture: 'popularBooks.json' }).as('popular');
      cy.visit('http://localhost:5173');
      cy.wait('@popular');
    });

    it('shows the title and slogan', () => {
      cy.get('[data-cy=title]').should('contain.text', 'My Bookshelf');
      cy.get('[data-cy=slogan]').should('contain.text', 'Read, Review, Repeat');
    });

    it('shows the login call to action, not the browse button', () => {
      cy.get('[data-cy=loginCallToAction]').should('be.visible');
      cy.get('[data-cy=loginBtn]').should('be.visible');
      cy.get('[data-cy=browseBtn]').should('not.exist');
      cy.get('[data-cy=popularSection]').should('not.exist');
      cy.get('[data-cy=currentReadsSection]').should('not.exist');
    });

    it('navigates to /login when the login button is clicked', () => {
      cy.get('[data-cy=loginBtn]').click();
      cy.location('pathname').should('eq', '/login');
    });
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/books/popular', { fixture: 'popularBooks.json' }).as('popular');
      cy.intercept('GET', '**/users/*/reading', { fixture: 'currentReads.json' }).as('currentReads');

      // FIXED: was bob@example.com / 12345678 — matches seeded Bob Callahan instead
      cy.login('bob.callahan@example.com', 'example1');
      cy.visit('http://localhost:5173');
      cy.wait(['@popular', '@currentReads']);
    });

    it('shows the browse button and hides the login prompt', () => {
      cy.get('[data-cy=browseBtn]').should('be.visible');
      cy.get('[data-cy=loginCallToAction]').should('not.exist');
      cy.get('[data-cy=loginBtn]').should('not.exist');
    });

    it('navigates to /discover when start browsing is clicked', () => {
      cy.get('[data-cy=browseBtn]').click();
      cy.location('pathname').should('eq', '/discover');
    });

    it('shows the popular section with books', () => {
      cy.get('[data-cy=popularSection]').should('be.visible');
      cy.get('[data-cy=popularBookList]').should('exist');
    });

    it('shows the current reads section with books', () => {
      cy.get('[data-cy=currentReadsSection]').should('be.visible');
      cy.get('[data-cy=currentReadsList]').should('exist');
      cy.get('[data-cy=noCurrentReadsMsg]').should('not.exist');
    });

    it('shows an empty state when there are no current reads', () => {
      cy.intercept('GET', '**/users/*/reading', { body: [] }).as('emptyReads');
      cy.visit('http://localhost:5173');
      cy.wait(['@popular', '@emptyReads']);

      cy.get('[data-cy=noCurrentReadsMsg]').should('be.visible');
      cy.get('[data-cy=currentReadsList]').should('not.exist');
    });

    it('shows an error state when the popular books request fails', () => {
      cy.intercept('GET', '**/books/popular', { statusCode: 500, body: {} }).as('popularError');
      cy.visit('http://localhost:5173');
      cy.wait('@popularError');
      cy.get('[data-cy=popularSection]').should('be.visible');
    });
  });
});
