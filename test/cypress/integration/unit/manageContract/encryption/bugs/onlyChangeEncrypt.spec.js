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

describe('Bug #2. Only change encryption to update the label [Backend]', () => {
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
    // Si se presiona visibility antes de guardar encripta nuevamente
    // cy.dataCy('visibilityInput')
    //   .click()
    cy.dataCy('addFieldButton')
      .click()
  })
  it.only('Verify the last element added has symbol = in the last position', () => {
    cy.dataCy('rowTD').then(($el) => {
      // var itemCount = Cypress.$($el).length - 1
      const row = 1
      const col = 2
      cy.dataCy('rowTD')
        .eq(col * (col * row - 1))
        .then(($input) => {
          const rowText = $input.text()
          cy.log(rowText)
          // invoke verify if the text is encrypt
        })
    })
  })
  it('Click button and sign transaction', () => {
    cy.dataCy('saveDataButton')
      .click()
    // spy on POST requests to /push_transaction TELOS endpoint
    cy.intercept('POST', 'https://test.telos.kitchen/v1/chain/push_transaction').as('sendSignature')
    // wait until response [30 sec to send sign transaction]
    // Expect response 202 from TLOS
    cy.wait('@sendSignature', { timeout: 30000 }).its('response.statusCode').should('eq', 202)
  })
  it('Toggle encryption', () => {
    // get the number of row
    cy.dataCy('editButton').then(($el) => {
      var itemCount = Cypress.$($el).length - 1
      cy.dataCy('editButton')
        .eq(itemCount)
        .click()
      cy.dataCy('FieldNameInput')
      cy.dataCy('visibilityInput')
        .click()
      cy.dataCy('checkboxEncrypt')
        .click()
      cy.dataCy('stringInput')
        .clear()
        .type(fakeValue)
      cy.dataCy('updateButton')
        .click()
    })
  })
})
