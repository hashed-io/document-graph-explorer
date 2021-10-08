import Faker from 'faker'
import Encrypt from '~/utils/EncryptUtil'

before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('editContracts')
    .contains('assignment')
    .click()
})
const fakeValue = Faker.lorem.sentence()
const key = '123'
describe('Encrypt string label', () => {
  it('Create new label with encryption and not save in IPFS', () => {
    cy.get('#addFieldButton')
      .click()
    cy.dataCy('FieldNameInput')
      .type(Faker.name.findName())
    cy.dataCy('typeInput')
      .click()
      .get('.q-item__label')
      .eq(0)
      .click()
    // Encryption dialog
    cy.dataCy('checkboxEncrypt')
      .click()
    cy.dataCy('keyInput')
      .type(key)
    cy.dataCy('confirmKey')
      .click()
    cy.dataCy('stringInput')
      .type(fakeValue)
    cy.dataCy('visibilityInput')
      .click()
    cy.dataCy('addFieldButton')
      .click()
  })
})
describe('Edit the label encrypted', () => {
  it('Edit the label encrypted before save in contract', () => {
    //     // get the number of row
    cy.dataCy('editButton').then(($el) => {
      var itemCount = Cypress.$($el).length - 1
      cy.dataCy('editButton')
        .eq(itemCount)
        .click()
      cy.dataCy('typeInput')
        .click()
        .get('.q-item__label')
        .eq(0)
        .click()
      cy.dataCy('visibilityInput')
        .click()
      // verificar que conteng a FakeValue
      cy.dataCy('stringInput')
        .clear()
        .type(Faker.name.findName())
      cy.dataCy('updateButton')
        .click()
    })
  })
})
describe('IPFS and encrypt the CID', () => {
  it.only('Create new label with IPFS and encrypt CID', () => {
    cy.get('#addFieldButton')
      .click()
    cy.dataCy('FieldNameInput')
      .type(Faker.name.findName())
    cy.dataCy('typeInput')
      .click()
      .get('.q-item__label')
      .eq(0)
      .click()
    cy.dataCy('checkboxIPFS')
      .click()
    // Encryption dialog
    cy.dataCy('checkboxEncrypt')
      .click()
    cy.dataCy('keyInput')
      .type(key)
    cy.dataCy('confirmKey')
      .click()
    cy.dataCy('stringInput')
      .type(fakeValue)
    cy.dataCy('visibilityInput')
      .click()
    cy.dataCy('addFieldButton')
      .click()
    cy.dataCy('saveDataButton')
      .click()
  })
  it('Verified encryption of label', () => {
    Encrypt.encryptText(fakeValue, key)
  })
})
