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
    cy.dataCy('daoNameInput')
      .clear()
      .type('testing')
    cy.dataCy('websiteInput')
      .type('telos.block.net')
    cy.dataCy('submitButton')
      .click()
  })
})
