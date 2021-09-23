/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

// Use `cy.dataCy` custom command for more robust tests
// See https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements

// ** This file is an example of how to write Cypress tests, you can safely delete it **

// This test will pass when run against a clean Quasar project
describe('Landing', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('title on package json is DAO LLC', () => {
    cy.title().should('include', 'DAO LLC')
  })
})

// ** The following code is an example to show you how to write some tests for your home page **
//
describe('Home page tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('has a logo', () => {
    cy.get('[data-cy="imgSplash"]')
      .should('have.attr', 'src')
      .and('include', 'app-splashscreen.png')
  })
  it('has steps information', () => {
    cy.dataCy('instructions')
      .should('contain', 'We’ve created')
      .and('contain', 'We’ve created this tool is to allow you to upload a copy of the official DAO LLC form to a public smart contract and help you comply with the DAO LLC requirement of generating a smart contract identifier required in Step 6 -')
      .and('contain', 'Step 1')
      .and('contain', 'Step 2')
      .and('contain', 'Step 3')
      .and('contain', 'Step 4')
  })
  it('has link to download Anchor Wallet', () => {
    cy.dataCy('linkAnchor')
      .should('have.attr', 'href')
      .and('contain', 'anchor')
  })
})
