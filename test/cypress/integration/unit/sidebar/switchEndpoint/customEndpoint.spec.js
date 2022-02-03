const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 0
beforeEach(() => {
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
})
describe('Changing the endpoint [success]', () => {
  it('select the endpoint', () => {
    cy.intercept('POST', endpoints[endpointSelect]).as('graphql')
    cy.dataCy('menu')
      .click()
    cy.dataCy('customEndpoint')
      .click()
    cy.dataCy('customEndpointField')
      .type('https://hashed.systems/alpha-dge-test/graphql')
    cy.wait('@graphql')
    cy.dataCy('switchButton')
      .click()
    cy.get('td')
      .should('exist')
  })
})
describe('Changing the endpoint [error]', () => {
  it('select the endpoint', () => {
    cy.intercept('POST', endpoints[endpointSelect]).as('graphql')
    cy.dataCy('menu')
      .click()
    cy.dataCy('customEndpoint')
      .click()
    cy.dataCy('customEndpointField')
      .type('https://hashed.systems/alpha-dge-test/')
    cy.wait('@graphql')
    cy.dataCy('switchButton')
      .should('not.exist')
    cy.get('td')
      .should('not.exist')
  })
})
