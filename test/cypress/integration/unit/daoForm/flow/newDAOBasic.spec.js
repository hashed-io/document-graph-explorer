before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('createNewDAOButton')
    .click()
  cy.dataCy('createDAOSimpleButton')
    .click()
})
describe('Navigate to create dao simple', () => {
  it('Fill the 3 inputs', () => {

  })
})
