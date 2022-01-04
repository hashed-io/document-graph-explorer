const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 0
before(() => {
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
})
describe('Changing the endpoint', () => {
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
    cy.dataCy('closeButton')
      .click()
  })
})
