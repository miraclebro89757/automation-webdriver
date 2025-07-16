class VarietiesPage {
  assertLoaded() {
    cy.get('.article-page h2').should('contain', '南瓜的品种');
  }
  getTitle() {
    return cy.get('.article-page h2');
  }
  scrollDown(pixels = 600) {
    cy.get('.article-page').scrollTo('bottom', { duration: 500 });
  }
  scrollUp(pixels = 600) {
    cy.get('.article-page').scrollTo('top', { duration: 500 });
  }
}

export default new VarietiesPage(); 