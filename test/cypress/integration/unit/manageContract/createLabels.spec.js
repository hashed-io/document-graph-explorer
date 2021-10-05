import Faker from 'faker'
before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('editContracts')
    .contains('assignment')
    .click()
})
// describe('Add Labels in manage contract component', { retries: 15 }, () => {
// Cypress._.times(1, (k) => {
//   it('test', () => {
//     cy.loginAnchor()
//     cy.visit('/home')
//   })
// })
beforeEach(() => {
  // root-level hook
  // runs before every test block
})

afterEach(() => {
  // runs after each test block
})

after(() => {
  // runs once all tests are done
})

Cypress._.times(2, (k) => {
  it('go to Contracts', () => {
    cy.get('#addFieldButton')
      .click()
    cy.dataCy('FieldNameInput')
      .type('ALEJANDRO GC' + k)
    cy.dataCy('typeInput')
      .click()
      .get('.q-item__label')
      .first()
      .click()
    cy.dataCy('stringInput')
      .type(Faker.name.findName())
    cy.dataCy('addFieldButton')
      .click()
  })
})
describe('save data in TLOS testnet', () => {
  it('Click button and sign transaction', () => {
    cy.dataCy('saveDataButton')
      .click()
  })
})
