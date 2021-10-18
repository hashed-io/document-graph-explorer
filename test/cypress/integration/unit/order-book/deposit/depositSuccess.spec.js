beforeEach(() => {
  cy.loginAnchor()
  cy.visit('/order-book')
  // spy on POST requests to /push_transaction TELOS endpoint
  cy.intercept('GET', '/sockjs-node/info?t=*').as('virtualScroll')
  // wait until response [30 sec to send sign transaction]
  // Expect response 202 from TLOS
  cy.visit('/order-book')
  cy.wait('@virtualScroll', { timeout: 30000 })
    .its('response.statusCode')
    .should('eq', 200)
  cy.dataCy('menuButton')
    .click()
  cy.dataCy('menuOrderBook')
    .click()
  cy.dataCy('accountInfo')
    .click()
})
import Faker from 'faker'

describe('Filling the inputs', () => {
  it('Success fill and deposit', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200)
    cy.get('.q-expansion-item')
      .eq(1)
      .click()
    cy.dataCy('assetInput')
      .type(Faker.datatype.number())
    cy.get('.q-field__append')
      .click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200)
      .get('.q-item__label')
      .eq(2)
      .click()
    cy.dataCy('depositButton')
      .click()
  })
  it('Asset missing', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200)
    cy.get('.q-expansion-item')
      .eq(1)
      .click()
    cy.get('.q-field__append')
      .click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200)
      .get('.q-item__label')
      .eq(2)
      .click()
    cy.dataCy('depositButton')
      .click()

    cy.get('.q-expansion-item')
      .eq(1)
      .click()
  })
  it('Token missing', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200)
    cy.get('.q-expansion-item')
      .eq(1)
      .click()
    cy.dataCy('assetInput')
      .type(Faker.datatype.number())
  })
})
describe('Validate Success deposit', () => {
  it('Check the new balance [before save the prev balance]', () => {

  })
})
