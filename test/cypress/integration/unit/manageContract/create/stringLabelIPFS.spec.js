import Faker from 'faker'

before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('editContracts')
    .contains('assignment')
    .click()
})
describe('create two news labels of type string and save in IPFS [Frontend]', () => {
  it('Label with type string and checkbox IPFS', () => {
    let dataCy = 'stringInput'
    let fakeValue = Faker.lorem.sentence()
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
    cy.dataCy(dataCy)
      .type(fakeValue)
    cy.dataCy('addFieldButton')
      .click()
  })
  // it('Label with type string and not checkbox IPFS', () => {
  //   cy.addNewLabel(0)
  // })
})
describe('update the two Labels with type string[Frontend]', () => {
  it('Edit label with type string', () => {
    // get the number of row
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
      cy.dataCy('stringInput')
        .clear()
        .type(Faker.name.findName())
      cy.dataCy('updateButton')
        .click()
    })
  })
  it('Edit the label with type string and checkbox true', () => {
    // get the number of row
    cy.dataCy('editButton').then(($el) => {
      var itemCount = Cypress.$($el).length - 2
      cy.dataCy('editButton')
        .eq(itemCount)
        .click()
      cy.dataCy('typeInput')
        .click()
        .get('.q-item__label')
        .eq(0)
        .click()
      cy.dataCy('stringInput')
        .clear()
        .type(Faker.name.findName())
      cy.dataCy('updateButton')
        .click()
    })
  })
})
describe('Change the state of the checkbox [save Data in IPFS or not] [Labels created and updated in frontend]', () => {
  it('Edit the label going from true to false, means data saved in IPFS, after the update no save in IPFS', () => {
    // get the number of row
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
      cy.dataCy('checkboxIPFS')
        .click()
      cy.dataCy('stringInput')
        .clear()
        .type(Faker.name.findName())
      cy.dataCy('updateButton')
        .click()
    })
  })
  it('Edit the label going from false to true, thats means data dont save in IPFS now saved', () => {
    // get the number of row
    cy.dataCy('editButton').then(($el) => {
      var itemCount = Cypress.$($el).length - 2
      cy.dataCy('editButton')
        .eq(itemCount)
        .click()
      cy.dataCy('typeInput')
        .click()
        .get('.q-item__label')
        .eq(0)
        .click()
      cy.dataCy('checkboxIPFS')
        .click()
      cy.dataCy('stringInput')
        .clear()
        .type(Faker.name.findName())
      cy.dataCy('updateButton')
        .click()
    })
  })
})
describe('save data in TLOS testnet', () => {
  it('Click button and sign transaction', () => {
    cy.dataCy('saveDataButton')
      .click()
    // spy on POST requests to /push_transaction TELOS endpoint
    cy.intercept('POST', 'https://test.telos.kitchen/v1/chain/push_transaction').as('sendSignature')
    // wait until response [30 sec to send sign transaction]
    // Expect response 202 from TLOS
    cy.wait('@sendSignature', { timeout: 30000 }).its('response.statusCode').should('eq', 202)
  })
})
describe('Update label and change checkbox state from TLOS [labels from backend] ', () => {
  it('Label with type string and checkbox IPFS [checkbox true]', () => {
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
      cy.dataCy('checkboxIPFS')
        .click()
      cy.dataCy('stringInput')
        .clear()
        .type(Faker.name.findName())
      cy.dataCy('updateButton')
        .click()
    })
  })
  it('Label with type string and not checkbox IPFS [checkbox false]', () => {
    cy.dataCy('editButton').then(($el) => {
      var itemCount = Cypress.$($el).length - 2
      cy.dataCy('editButton')
        .eq(itemCount)
        .click()
      cy.dataCy('typeInput')
        .click()
        .get('.q-item__label')
        .eq(0)
        .click()
      cy.dataCy('checkboxIPFS')
        .click()
      cy.dataCy('stringInput')
        .clear()
        .type(Faker.name.findName())
      cy.dataCy('updateButton')
        .click()
    })
  })
})
describe('save data in TLOS testnet', () => {
  it('Click button and sign transaction', () => {
    cy.dataCy('saveDataButton')
      .click()
    // spy on POST requests to /push_transaction TELOS endpoint
    cy.intercept('POST', 'https://test.telos.kitchen/v1/chain/push_transaction').as('sendSignature')
    // wait until response [30 sec to send sign transaction]
    // Expect response 202 from TLOS
    cy.wait('@sendSignature', { timeout: 30000 }).its('response.statusCode').should('eq', 202)
  })
})
