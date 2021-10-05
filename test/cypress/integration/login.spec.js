
/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

// ** The following code is an example to show you how to write some tests for your home page **
//
beforeEach(() => {
  cy.loginAnchor()
  // cy.saveLocalStorage({ 'account': 'alejandroga1', 'autoLogin': 'Anchor', 'returning': true })
})
describe('Home page tests', () => {
  it('has link to download Anchor Wallet 3', () => {
    cy.visit('/home')
    // cy.dataCy('loginButton')
    //   .contains('Anchor')
    //   .click()
    // cy.wait(3000) // wait for 2 seconds
  })
  // it('go to Contracts', () => {
  //   cy.dataCy('editContracts')
  //     .click()
  // })
})
describe('Contract pages', () => {
  it('go to Contracts', () => {
    cy.visit('/home')
    cy.dataCy('editContracts')
      .contains('assignment')
      .click()
    cy.get('#addFieldButton')
      .click()
    cy.dataCy('FieldNameInput')
      .type('ALEJANDRO GC')
  })
  it('Open Modal', () => {

  })
})
