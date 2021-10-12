before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('createNewDAOButton')
    .click()
  cy.dataCy('createDAOButton')
    .click()
  cy.dataCy('step1Button')
    .click()
})
describe('Business Name rules', () => {
  it('Change selection of period of duration', () => {
    const valueSelect = 3
    cy.qSelect('selectPeriod', valueSelect)
  })
})
