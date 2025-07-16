// chrome-cypress/support/pages/HomePage.js

export class HomePage {
  visit() {
    cy.visit('/');
  }
  getTitle() {
    return cy.get('h1');
  }
  clickStartGame() {
    cy.get('.start-btn').click();
  }
} 