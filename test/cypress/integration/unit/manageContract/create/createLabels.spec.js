import Faker from 'faker'

before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('editContracts')
    .contains('assignment')
    .click()
})
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

Cypress._.times(1, (k) => {
  it('Create new labels', () => {
    cy.addNewLabel(1)
  })
})
describe('create new label saving in IPFS', () => {
  it('', () => {
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
    cy.dataCy(dataCy)
      .type(fakeValue)
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
