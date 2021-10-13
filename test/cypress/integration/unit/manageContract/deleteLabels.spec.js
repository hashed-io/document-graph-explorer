before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('editContracts')
    .contains('assignment')
    .click()
})
// Eliminar el último elemento
Cypress._.times(1, (k) => {
  it('go to Contracts', () => {
    cy.dataCy('deleteButton')
      .last()
      .click()
  })
})
describe('save data in TLOS testnet', () => {
  it('Click button and sign transaction', () => {
    cy.dataCy('saveDataButton')
      .click()
  })
})
