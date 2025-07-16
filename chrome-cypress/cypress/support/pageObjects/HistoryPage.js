class HistoryPage {
  assertLoaded() {
    cy.get('.article-page h2').should('contain', '南瓜的历史');
  }
  getTitle() {
    return cy.get('.article-page h2');
  }
}

export default new HistoryPage(); 