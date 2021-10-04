
/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

// ** The following code is an example to show you how to write some tests for your home page **
//
describe('Home page tests', () => {
  // beforeEach(() => {
  // })
  it('has link to download Anchor Wallet 3', () => {
    cy.visit('/home')
    cy.dataCy('loginButton')
      .contains('Anchor')
      .click()
    // cy.wait(1000) // wait for 2 seconds
  })
  // it('go to Contracts', () => {
  //   cy.dataCy('editContracts')
  //     .click()
  // })
})
describe('Contract pages', () => {
  it('go to Contracts', () => {
    // cy.visit('/home')
    cy.dataCy('editContracts')
      .contains('assignment')
      .click()
  })
})
