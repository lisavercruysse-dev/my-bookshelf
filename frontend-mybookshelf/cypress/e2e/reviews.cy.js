describe('Add, edit and remove a review', () => {
  beforeEach(() => {
    cy.login('bob@example.com', '12345678');
  });

  it('should add a review', () => {
    cy.visit('http://localhost:5173/books/9780140449136');

    cy.get('[data-cy=addToShelfBtn]').click();
    cy.get('[data-cy=shelfSelect]').select('Finished');
    cy.get('[data-cy=addToShelfSubmitBtn]').click();

    cy.get('[data-cy=writeReviewBtn]').should('be.visible').click();

    cy.get('[data-cy=reviewTitleInput]').type('A great read');
    cy.get('[data-cy=recommendedYesLabel]').click();
    cy.get('[data-cy=starBtn-4]').click();
    cy.get('[data-cy=reviewBodyInput] .ProseMirror').type('Really enjoyed this book.');
    cy.get('[data-cy=reviewSubmitBtn]').click();

    cy.visit('http://localhost:5173/myReviews');

    cy.contains('[data-cy=reviewItem]', 'A great read').should('exist');
  });

  describe('the created review card', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/myReviews');
    });

    it('shows the reviewer name and date', () => {
      cy.contains('[data-cy=reviewItem]', 'Absolute must-read').within(() => {
        cy.get('[data-cy=reviewUserName]').should('contain.text', 'Bob');
        cy.get('[data-cy=reviewDate]').should('be.visible');
      });
    });

    it('shows the review title and body', () => {
      cy.contains('[data-cy=reviewItem]', 'Absolute must-read').within(() => {
        cy.get('[data-cy=reviewTitle]').should('contain.text', 'Absolute must-read');
        cy.get('[data-cy=reviewBody]').should('contain.text', 'works');
      });
    });

    it('shows the correct star rating', () => {
      cy.contains('[data-cy=reviewItem]', 'Absolute must-read').within(() => {
        cy.get('[data-cy=reviewStars]').should('have.attr', 'data-stars', '5');
      });
    });

    it('shows the recommended badge', () => {
      cy.contains('[data-cy=reviewItem]', 'Absolute must-read').within(() => {
        cy.get('[data-cy=reviewRecommended]').should('be.visible');
      });
    });

    it('updates the average rating to include this review', () => {
      cy.get('[data-cy=averageRating]').should('be.visible');
      cy.get('[data-cy=averageRating]').should('contain.text', '4.7');
    });
  });

  it('should edit the review', () => {
    cy.visit('http://localhost:5173/myReviews');

    cy.contains('[data-cy=reviewItem]', 'A great read')
      .find('[data-cy=editReviewBtn]').click();

    cy.get('[data-cy=editReviewModal]').should('be.visible');
    cy.get('[data-cy=reviewTitleInput]').clear();
    cy.get('[data-cy=reviewTitleInput]').type('Updated title');
    cy.get('[data-cy=reviewSubmitBtn]').click();

    cy.get('[data-cy=editReviewModal]').should('not.exist');
    cy.contains('[data-cy=reviewItem]', 'Updated title').should('exist');
  });

  it('should show validation errors for an empty title', () => {
    cy.visit('http://localhost:5173/myReviews');

    cy.contains('[data-cy=reviewItem]', 'Updated title')
      .find('[data-cy=editReviewBtn]').click();

    cy.get('[data-cy=reviewTitleInput]').clear();
    cy.get('[data-cy=reviewTitleInput]').blur();
    cy.get('[data-cy=reviewSubmitBtn]').click();

    cy.get('[data-cy=reviewTitleError]').contains('Title is required');
  });

  it('should remove the review', () => {
    cy.visit('http://localhost:5173/myReviews');

    cy.get('[data-cy=reviewItem]').its('length').then((countBefore) => {
      cy.contains('[data-cy=reviewItem]', 'Updated title')
        .find('[data-cy=deleteReviewBtn]').click();

      cy.get('[data-cy=reviewItem]').should('have.length', countBefore - 1);
      cy.contains('[data-cy=reviewItem]', 'Updated title').should('not.exist');
    });
  });
});