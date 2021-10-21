import Faker from 'faker'
before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('editContracts')
    .contains('assignment')
    .click()
})
const key = '123'
const fixtureFile = 'pdf-test.pdf'
describe('Upload File', () => {
  it('Upload and encrypt file', () => {
    cy.get('#addFieldButton')
      .click()
    cy.dataCy('FieldNameInput')
      .type(Faker.name.findName())
    cy.dataCy('typeInput')
      .click()
      .get('.q-item__label')
      .eq(6)
      .click()
    cy.get('[data-cy="fileInput"]')
      .attachFile(fixtureFile)
    // Encryption dialog
    cy.dataCy('checkboxEncrypt')
      .click()
    cy.dataCy('keyInput')
      .type(key)
    cy.dataCy('confirmKey')
      .click()
    cy.dataCy('addFieldButton')
      .click()
  })
})
