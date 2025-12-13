describe('Add and remove saved book', () => {
  it('should add a new saved book', () => {
    cy.visit('http://localhost:5173/addOrEditSavedBook/isbn/9781781103142');

    cy.get('[data-cy=statusId]').select('1');
    cy.get('[data-cy=userId]').type('1');
    cy.get('[data-cy=pagesRead]').type('0');
    cy.get('[data-cy=favorite]').uncheck();
    cy.get('[data-cy=dateStarted]').clear();
    cy.get('[data-cy=dateEnded]').clear();
    cy.get('body').click(0, 0);
    cy.get('[data-cy=submitButton]').click();

    cy.get('[data-cy=savedBookAuthor]').eq(1).contains('J.K. Rowling');
    cy.get('[data-cy=savedBookGenre]').eq(1).contains('Fantasy');
    cy.get('[data-cy=savedBookPages]').eq(1).contains('336');
    cy.get('[data-cy=savedBookStatus]').eq(1).contains('TBR');
    cy.get('[data-cy=savedBookPagesRead]').eq(1).contains('0');
    cy.get('[data-cy=savedBookFavorite]').eq(1).contains('No');
    cy.get('[data-cy=savedBookDateStarted]').eq(1).contains('N/A');
    cy.get('[data-cy=savedBookDateEnded]').eq(1).contains('N/A');
  });

  it('should remove saved book', () => {
    cy.visit('http://localhost:5173/myBooks');
    cy.get('[data-cy=savedBookDeleteButton]').eq(1).click();
    cy.get('[data-cy=savedBookAuthor]').eq(1).should('not.exist');
  });
});

describe('Invalid userId does not save book', () => {
  it('Should show message for invalid userId', () => {
    cy.visit('http://localhost:5173/addOrEditSavedBook/isbn/9781781103142');
    cy.get('[data-cy=userId]').type('-1');
    cy.get('[data-cy=userId]').blur();
    cy.get('[data-cy=submitButton]').click();

    cy.get('[data-cy=userIdError').contains('UserId must be minimum 1');
  });
});

describe('Too high pagesRead does not save book', () => {
  it('Should show message for too high pagesRead', () => {
    cy.visit('http://localhost:5173/addOrEditSavedBook/isbn/9781781103142');
    cy.get('[data-cy=pagesRead]').type('541');
    cy.get('[data-cy=pagesRead]').blur();
    cy.get('[data-cy=submitButton]').click();

    cy.get('[data-cy=pagesReadError]').contains('Cannot exceed total pages');
  });
});

describe('Too low pagesRead does not save book', () => {
  it('Should show message for too low pagesRead', () => {
    cy.visit('http://localhost:5173/addOrEditSavedBook/isbn/9781781103142');
    cy.get('[data-cy=pagesRead]').type('-1');
    cy.get('[data-cy=pagesRead]').blur();
    cy.get('[data-cy=submitButton]').click();

    cy.get('[data-cy=pagesReadError]').contains('Read pages must be at least 0');
  });
});