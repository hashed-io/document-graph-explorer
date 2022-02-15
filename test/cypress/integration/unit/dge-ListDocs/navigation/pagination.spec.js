const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 0
var firstRow, secondRow
beforeEach(() => {
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
})
describe('Any user can navigate through the Graph', () => {
  it('Next page', () => {
    cy.intercept('POST', endpoints[endpointSelect]).as('graphql')
    cy.wait('@graphql')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000)
    cy.get('tr')
      .eq(1)
      .then((values) => {
        let rowStr = ''
        values.map((i, elem) => {
          rowStr += ' ' + Cypress.$(elem).text() + ' '
        })
        firstRow = rowStr
      })
    cy.dataCy('nextPage')
      .click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000)
    cy.get('td')
      .should('exist')
    cy.dataCy('nextPage')
      .click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000)
    cy.get('tr')
      .eq(1)
      .then((values) => {
        let rowStr = ''
        values.map((i, elem) => {
          rowStr += ' ' + Cypress.$(elem).text() + ' '
        })
        secondRow = rowStr
        assert.notEqual(secondRow, firstRow, 'Vals no equal')
      })
    cy.intercept('POST', endpoints[endpointSelect]).as('graphql')
    cy.wait('@graphql')
    cy.get('td')
      .should('exist')
  })
})
