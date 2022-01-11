const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 2
beforeEach(() => {
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
})
describe('Visualize doc', () => {
  it('actions are shown', () => {
    cy.loginAnchor()
    cy.visit('/?endpoint=' + endpoints[endpointSelect])
    cy.dataCy('loginButton')
      .click()
    cy.dataCy('rowDoc')
      .eq(1)
      .click()
    cy.scrollTo('bottom')
    cy.dataCy('eraseButton')
      .click()
    cy.get('b').then(($b) => {
      const txt = $b.text()
      let arr = txt.split('\n')
      let text = arr[0] + ' ' + arr[1]
      cy.dataCy('deleteInput')
        .type(text)
      cy.dataCy('confirmDeleteButton')
        .click()
    })
    cy.get(`[data-cy='eraseButton']`).should('exist')
  })
})
