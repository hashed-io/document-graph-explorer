
before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('createNewDAOButton')
    .click()
  cy.dataCy('step1Button')
    .click()
})
describe('Business Name rules', () => {
  it('Get error if Not contain DAO LLC [fail]', () => {
    cy.qSelect('selectPeriod', 3)
  })
})
