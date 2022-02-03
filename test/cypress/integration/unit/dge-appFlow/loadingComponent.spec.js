const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 2
beforeEach(() => {
  cy.loginAnchor()
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
  cy.dataCy('loginButton')
    .click()
})

describe('The loading component appear', () => {
  it('When you explore a document', () => {
    cy.dataCy('rowDoc')
      .eq(3)
      .click()
    cy.dataCy('spinner')
      .should('exist')
  })
  it('When the user edit the document', () => {
    cy.dataCy('rowDoc')
      .eq(3)
      .click()
    cy.scrollTo('bottom')
    cy.dataCy('editButton')
      .click()
    cy.dataCy('spinner')
      .should('exist')
  })
  it('When the user see all the docs', () => {
    cy.visit('/?endpoint=' + endpoints[endpointSelect])
    cy.dataCy('spinner')
      .should('exist')
  })
})
