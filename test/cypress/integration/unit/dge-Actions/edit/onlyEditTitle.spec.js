// TODO: Only edit the title and save the using the action
//
import Faker from 'faker'
const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 2
before(() => {
  cy.loginAnchor()
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
  cy.dataCy('loginButton')
    .click()
})
describe('Visualize doc', () => {
  it('actions are shown', () => {
    cy.dataCy('rowDoc')
      .eq(3)
      .click()
    cy.scrollTo('bottom')
    cy.dataCy('editButton')
      .click()
  })
})
describe('Edit the Document', () => {
  it('Duplicate label [system]', () => {
    cy.dataCy('editTitleButton').then(($el) => {
      var itemCount = Cypress.$($el).length - 1
      cy.dataCy('editTitleButton')
        .eq(itemCount)
        .click()
      cy.dataCy('titleInput')
        .type('L')
        .clear()
        .type('system')
      cy.dataCy('saveTitleButton')
        .click()
        // assert error apppear
      cy.get('.q-notification')
        .should('be.visible')
      cy.get('.q-notification__actions')
        .click()
      cy.dataCy('titleInput')
        .type('L')
        .clear()
        .type(Faker.lorem.word())
      cy.dataCy('saveTitleButton')
        .click()
    })
  })
  it('Edit Label success', () => {
    cy.dataCy('editTitleButton').then(($el) => {
      var itemCount = Cypress.$($el).length - 1
      cy.dataCy('editTitleButton')
        .eq(itemCount)
        .click()
      cy.dataCy('titleInput')
        .type(Faker.lorem.word())
      cy.get('.q-notification')
        .should('not.exist')
      cy.dataCy('saveTitleButton')
        .click()
    })
  })
})
describe('Save doc', () => {
  it('Saving using Anchor', () => {
    cy.dataCy('saveDoc')
      .click()
  })
})
