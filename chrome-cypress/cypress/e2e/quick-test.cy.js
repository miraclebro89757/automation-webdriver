import HomePage from '../support/pageObjects/HomePage';
import Navbar from '../support/pageObjects/Navbar';

describe('Pumpkin Web 快速测试', () => {
  it('首页多选和单选交互', () => {
    HomePage.visit();
    HomePage.selectEatWays(['南瓜粥 🥣', '南瓜饼 🥞']);
    HomePage.getEatWaysResult().should('contain', '南瓜粥').and('contain', '南瓜饼');
    HomePage.selectCountry('中国 🇨🇳');
    HomePage.getCountryResult().should('contain', '中国');
  });

  it('导航栏跳转', () => {
    HomePage.visit();
    Navbar.goToHistory();
    cy.url().should('include', '/history');
    Navbar.goToVarieties();
    cy.url().should('include', '/varieties');
    Navbar.goToGame();
    cy.url().should('include', '/game');
    Navbar.goToHome();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
}); 