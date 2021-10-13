import Faker from 'faker'
before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('editContracts')
    .contains('assignment')
    .click()
})
// Editar el último elemento
Cypress._.times(1, (k) => {
  it('go to Contracts', () => {
    cy.dataCy('editButton')
      .last()
      .click()
    // cy.dataCy('FieldNameInput')
    //   .type('ALEJANDRO GC' + k)
    cy.dataCy('typeInput')
      .click()
      .get('.q-item__label')
      .first()
      .click()
    cy.dataCy('stringInput')
      .clear()
      .type(Faker.name.findName())
    cy.dataCy('updateButton')
      .click()
  })
})

describe('save data in TLOS testnet', () => {
  it('Click button and sign transaction', () => {
    cy.dataCy('saveDataButton')
      .click()
  })
})
