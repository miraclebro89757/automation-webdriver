class GamePage {
  assertLoaded() {
    cy.get('.article-page h2').should('contain', '南瓜世界传播迷宫');
  }
  getTitle() {
    return cy.get('.article-page h2');
  }
  clickReset() {
    cy.get('.article-page button').contains('重置迷宫').click();
  }
}

export default new GamePage(); 