class HomePage {
  visit() {
    cy.visit('/');
  }

  selectEatWays(values) {
    values.forEach(val => {
      cy.get('.home-page .card').first().find('label').contains(val).click();
    });
  }

  selectCountry(label) {
    cy.get('.home-page .card').eq(1).find('label').contains(label).click();
  }

  getEatWaysResult() {
    return cy.get('.home-page .card').first().contains('你选择了');
  }

  getCountryResult() {
    return cy.get('.home-page .card').eq(1).contains('你选择了');
  }
}

export default new HomePage(); 