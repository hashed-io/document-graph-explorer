const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 1
before(() => {
  cy.loginAnchor()
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
  cy.dataCy('loginButton')
    .click()
})
describe('Create new Document', () => {
  it('Open the create view', () => {
    cy.dataCy('newDocButton')
      .click()
  })
})
describe('Create a new document type [fail]', () => {
  it('type new doc type and don\'t press enter', () => {
    cy.dataCy('docTypeName')
      .type('test-new-doc-type')
  })
  it('try to save the doc', () => {
    cy.dataCy('saveDoc')
      .click()
  })
  it('The error is showed', () => {
    cy.get('.q-notification')
      .should('be.visible')
    cy.get('.q-notification__actions')
      .click()
  })
})
describe('Create a new document type [success]', () => {
  it('type new doc type', () => {
    cy.dataCy('docTypeName')
      .type('test-new-doc-type')
      .type('{enter}')
  })
  it('press enter [quasar component require] [show functionality]', () => {
    cy.dataCy('docTypeName')
      .type('{enter}')
  })
  it('Assert the value is the same', () => {
    cy.dataCy('docType')
      .invoke('text')
      .should('be.equal', 'test-new-doc-type')
  })
})
describe('Choose document type', () => {
  it('Open the options of the select element', () => {
    cy.dataCy('docTypeName')
      .click()
  })
  it('Choose an element', () => {
    cy.get('.q-item__label')
      .eq(0)
      .click()
    cy.dataCy('docType')
      .invoke('text')
      .should('be.not.equal', '')
  })
})
