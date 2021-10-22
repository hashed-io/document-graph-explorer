// import Faker from 'faker'

before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('editContracts')
    .contains('assignment')
    .click()
})

describe('create new random labels', () => {
  const max = 5
  const min = 1
  const iterations = 2
  Cypress._.times(iterations, (k) => {
    it('Create new labels', () => {
      let randNumber = Math.floor(Math.random() * (max - min) + min)
      cy.log('Etiqueta: ' + randNumber)
      cy.addNewLabel(0)
    })
  })
  // cy.log(Faker.datatype.number())
  // let dataCy = 'stringInput'
  // let fakeValue = Faker.lorem.sentence()
  // cy.get('#addFieldButton')
  //   .click()
  // cy.dataCy('FieldNameInput')
  //   .type(Faker.name.findName())
  // cy.dataCy('typeInput')
  //   .click()
  //   .get('.q-item__label')
  //   .eq(0)
  //   .click()
  // cy.dataCy(dataCy)
  //   .type(fakeValue)
  // cy.dataCy('addFieldButton')
  //   .click()
})
describe('save data in TLOS testnet', () => {
  it('Click button and sign transaction', () => {
    cy.dataCy('saveDataButton')
      .click()
  })
})
