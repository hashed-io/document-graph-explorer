const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 2
beforeEach(() => {
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
})
describe('Visualize doc', () => {
  it('click and see doc [actions are not shown]', () => {
    cy.dataCy('rowDoc')
      .eq(0)
      .click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2500)
    cy.get(`[data-cy='eraseButton']`).should('not.exist')
  })
})
describe('Visualize doc', () => {
  it('actions are shown', () => {
    cy.loginAnchor()
    cy.visit('/?endpoint=' + endpoints[endpointSelect])
    cy.dataCy('loginButton')
      .click()
    cy.dataCy('accountName')
      .should('exist')
    cy.dataCy('rowDoc')
      .eq(1)
      .click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2500)
    cy.get(`[data-cy='eraseButton']`).should('exist')
  })
})
