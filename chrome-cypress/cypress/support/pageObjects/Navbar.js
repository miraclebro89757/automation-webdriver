class Navbar {
  goToHome() {
    cy.get('.nav-logo').click();
  }
  goToHistory() {
    cy.get('.nav-links').contains('南瓜的历史').click();
  }
  goToVarieties() {
    cy.get('.nav-links').contains('南瓜的品种').click();
  }
  goToGame() {
    cy.get('.nav-links').contains('南瓜游戏').click();
  }
}

export default new Navbar(); 