before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('createNewDAOButton')
    .click()
  cy.dataCy('createDAOButton')
    .click()
  cy.dataCy('step1Button')
    .click()
  cy.dataCy('step2Button')
    .click()

  // Fill agent form
  cy.dataCy('searchAgentButton')
    .click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500)
  cy.get('table')
    .eq(0)
    .within(() => {
      cy.get('td').eq(1).click()
    })
  cy.dataCy('checkbox')
    .click()
  cy.dataCy('step3Button')
    .click()
  // End fill agent form
  cy.dataCy('checkboxCopy')
    .click()
  cy.dataCy('step4Button')
    .click()
  cy.dataCy('step5Button')
    .click()
  cy.dataCy('step6Button')
    .click()
  cy.dataCy('step7Button')
    .click()
  // Fill signature page
  cy.dataCy('checkbox1')
    .click()
  cy.dataCy('checkbox2')
    .click()
  cy.dataCy('checkbox3')
    .click()
  cy.dataCy('checkbox4')
    .click()
  cy.dataCy('checkbox5')
    .click()
  cy.dataCy('checkbox6')
    .click()
  cy.dataCy('checkbox7')
    .click()
  // end
  cy.dataCy('daoName')
    .clear()
    .type('alejandroga4')
  cy.dataCy('website')
    .type('https://horizonlandsales.com/property/laramie-river-ranch-lot-45-35-84-acres/')
})
describe('Fill the DAO Form wyoming steps', () => {
  it('Click', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)
    cy.dataCy('finishForm')
      .click()
  })
})
