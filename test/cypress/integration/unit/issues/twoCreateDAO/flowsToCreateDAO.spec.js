beforeEach(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('createNewDAOButton')
    .click()
})
describe('There are two flows to create a new DAO', () => {
  it('1. Create DAO', () => {
    cy.dataCy('createDAOButton')
      .click()
    cy.url().should('include', '/registerDao')
  })
  it('2. Create DAO Simple', () => {
    cy.dataCy('createDAOSimpleButton')
      .click()
    cy.url().should('include', '/registerDaoSimple')
  })
})
