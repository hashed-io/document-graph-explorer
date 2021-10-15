import Faker from 'faker'
// import Encrypt from '/home/edwin/Documentos/m1ghty/DAO-LLC-WEBAPP/src/utils/EncryptUtil.js'

before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('editContracts')
    .contains('assignment')
    .click()
})
const fakeValue = 'Ut est dolorem dolore consectetur. Sit tempora adipisci dolore labore sed numquam neque. Magnam magnam amet adipisci eius amet quisquam dolore. Quaerat ut consectetur quiquia quaerat. Eius neque etincidunt voluptatem magnam labore tempora.'
const key = '123'
describe('Bug #2. Only change encryption to update the label [Backend]', () => {
  it('Create new label without encryption and not save in IPFS', () => {
    cy.get('#addFieldButton')
      .click()
    cy.dataCy('FieldNameInput')
      .type(Faker.name.findName())
    cy.dataCy('typeInput')
      .click()
      .get('.q-item__label')
      .eq(0)
      .click()
    cy.dataCy('stringInput')
      .type(fakeValue)
    // Si se presiona visibility antes de guardar encripta nuevamente
    // cy.dataCy('visibilityInput')
    //   .click()
    cy.dataCy('addFieldButton')
      .click()
  })
  // it('Verify the last element added has symbol = in the last position', () => {
  //   cy.dataCy('rowTD').then(($el) => {
  //     cy.dataCy('editButton').then(($el) => {
  //       var itemCount = Cypress.$($el).length - 1
  //       const row = itemCount
  //       const col = 2
  //       cy.dataCy('rowTD')
  //         .eq(col * (col * row - 1))
  //         .then(($input) => {
  //           const rowText = $input.text()
  //           const verifyEncrypt = (rowText) => {
  //             console.log(rowText)
  //             return rowText.substr(-1) === '='
  //           }
  //           // cy.log('The row added has symbol?', verifyEncrypt(rowText))
  //           // invoke verify if the text is encrypt
  //           expect(verifyEncrypt(rowText)).to.eq(true)
  //         })
  //     })
  //   })
  // })
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
      // cy.dataCy('visibilityInput')
      //   .click()
      cy.dataCy('checkboxEncrypt')
      // .click()
      cy.fillCryptoDialog(key)
      cy.dataCy('updateButton')
        .click()
    })
  })
  it('Save data. Click button and sign transaction', () => {
    cy.dataCy('saveDataButton')
      .click()
    // spy on POST requests to /push_transaction TELOS endpoint
    cy.intercept('POST', 'https://test.telos.kitchen/v1/chain/push_transaction').as('sendSignature')
    // wait until response [30 sec to send sign transaction]
    // Expect response 202 from TLOS
    cy.wait('@sendSignature', { timeout: 30000 }).its('response.statusCode').should('eq', 202)
  })
})
