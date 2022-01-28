const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 0
beforeEach(() => {
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
})
describe('Any user can navigate through the Graph', () => {
  it('Next page', () => {
    cy.dataCy('nextPage')
      .click()
    cy.intercept('POST', endpoints[endpointSelect]).as('graphql')
    cy.wait('@graphql')
    cy.get('td')
      .should('exist')
    cy.dataCy('nextPage')
      .click()
    cy.intercept('POST', endpoints[endpointSelect]).as('graphql')
    cy.wait('@graphql')
    cy.get('td')
      .should('exist')
  })
})
