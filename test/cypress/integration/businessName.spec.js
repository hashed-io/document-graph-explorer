
/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

// ** The following code is an example to show you how to write some tests for your home page **
//
describe('Home page tests', () => {
  beforeEach(() => {
    cy.loginAnchor()
  })
  it('BusinessName input', () => {
    cy.visit('/home')
    cy.dataCy('createNewDAOButton')
      .click()
    cy.dataCy('businessInput')
      .clear()
      .get('.q-field__messages')
      .contains('This field is required')
  })
})
