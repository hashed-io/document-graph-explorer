
/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

// ** The following code is an example to show you how to write some tests for your home page **
//
describe('Home page tests', () => {
  beforeEach(() => {
    cy.visit('/home')
  })
  it('has link to download Anchor Wallet 2', () => {
    cy.dataCy('loginButton')
      .containts('Anchor')
      .click()
      // .type('AGC')
  })
})
