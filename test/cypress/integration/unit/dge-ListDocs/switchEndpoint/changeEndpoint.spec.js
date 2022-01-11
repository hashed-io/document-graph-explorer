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
    cy.dataCy('listBlockchains').then(($el) => {
      var itemCount = Cypress.$($el).length - 1
      cy.log(itemCount)
      cy.dataCy('listBlockchains')
        .eq(0)
        .click()
    })
    cy.dataCy('endpointOptions').then(($el) => {
      var itemCount = Cypress.$($el).length - 1
      cy.log(itemCount)
      cy.dataCy('endpointOptions')
        .eq(0)
        .click()
    })
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1500)
    cy.wait('@graphql')
    cy.dataCy('switchButton')
      .click()
    cy.dataCy('closeButton')
      .click()
  })
})
