// import Faker from 'faker'

before(() => {
  cy.loginAnchor()
  cy.visit('/home')
  cy.dataCy('editContracts')
    .contains('assignment')
    .click()
})

describe('create new random labels', () => {
  const max = 6
  const min = 0
  const iterations = 5
  Cypress._.times(iterations, (k) => {
    it('Create new labels', () => {
      let randNumber = Math.floor(Math.random() * (max - min) + min)
      cy.log('Etiqueta: ' + randNumber)
      cy.addNewLabel(randNumber)
    })
  })
})
describe('save data in TLOS testnet', () => {
  it('Click button and sign transaction', () => {
    cy.dataCy('saveDataButton')
      .click()
  })
})
