import Faker from 'faker'
// import Encrypt from '/home/edwin/Documentos/m1ghty/DAO-LLC-WEBAPP/src/utils/EncryptUtil.js'

before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('editContracts')
    .contains('assignment')
    .click()
})
const fakeValue = Faker.lorem.sentence()
const key = '123'

describe('Bug #1. Encryption not detected', () => {
  it('Create new label with IPFS and encrypt CID', () => {
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
    // Intercept IPFS response
    cy.server()
    cy.route('POST', 'https://ipfs.infura.io:5001/api/v0/add?*').as('ipfs')
    cy.dataCy('addFieldButton')
      .click()
    cy.wait('@ipfs').then((xhr) => {
      expect(xhr.status).to.eq(200)
    })
  })
  // it('Verified the encryption of label in IPFS', () => {
  //   // get the number of row
  //   cy.dataCy('editButton').then(($el) => {
  //     var itemCount = Cypress.$($el).length - 1
  //     cy.dataCy('editButton')
  //       .eq(itemCount)
  //       .click()
  //     cy.log('Fake Value', fakeValue)
  //     cy.dataCy('stringInput').then(($input) => {
  //       const inputValue = ($input.val())
  //       const decryptValue = Encrypt.decryptText(inputValue, key)
  //       cy.log('The assert validate if the encryption is correct')
  //       expect(decryptValue).to.eq(fakeValue)
  //       cy.log('Value encrypted in Input', inputValue)
  //     })
  //     cy.dataCy('visibilityInput')
  //       .click()
  //     // verificar que contenga FakeValue
  //     cy.dataCy('stringInput')
  //       .should('have.value', fakeValue)
  //       // .clear()
  //       .type(fakeValue)
  //     cy.dataCy('updateButton')
  //       .click()
  //   })
  // })
  it('Save data. Click button and sign transaction', () => {
    cy.dataCy('saveDataButton')
      .click()
    // spy on POST requests to /push_transaction TELOS endpoint
    cy.intercept('POST', 'https://test.telos.kitchen/v1/chain/push_transaction').as('sendSignature')
    // wait until response [30 sec to send sign transaction]
    // Expect response 202 from TLOS
    cy.wait('@sendSignature', { timeout: 30000 }).its('response.statusCode').should('eq', 202)
  })
  it('Edit the label encrypted and IPFS. Verify encrypt checkbox', () => {
    // get the number of row
    cy.dataCy('editButton').then(($el) => {
      var itemCount = Cypress.$($el).length - 1
      cy.dataCy('editButton')
        .eq(itemCount)
        .click()
      cy.dataCy('checkboxEncrypt')
        .children()
        .should('have.class', 'q-checkbox__inner--truthy')
      cy.dataCy('updateButton')
        .click()
      cy.dataCy('saveDataButton')
        .click()
    })
  })
})
