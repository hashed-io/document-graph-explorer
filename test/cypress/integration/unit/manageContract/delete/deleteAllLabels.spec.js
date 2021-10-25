before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('editContracts')
    .contains('assignment')
    .click()
})
describe('Delete all Labels in the account', () => {
  it('Get all labels and click in Delete', () => {
    // Get the counter in the pagination
    cy.get('.q-table__bottom-item').then(($bottom) => {
      const totalLabels = parseInt($bottom.text().split('of')[1])
      cy.log('To delete: ' + totalLabels)
      // Eliminar el último elemento
      Cypress._.times(totalLabels, (k) => {
        cy.dataCy('deleteButton')
          .eq(0)
          .click()
      })
    })
  })
})
describe('save data in TLOS testnet', () => {
  it('Click button and sign transaction', () => {
    cy.SaveBlockChain()
  })
})
