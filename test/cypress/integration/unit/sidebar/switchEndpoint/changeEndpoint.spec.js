const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 0
var firstRow, secondRow
before(() => {
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
})
describe('Changing the endpoint', () => {
  it('select the endpoint', () => {
    cy.intercept('POST', endpoints[endpointSelect]).as('graphql')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2500)
    // Get the first row to compare with the new endpoint
    cy.get('tr')
      .eq(1)
      .then((values) => {
        let rowStr = ''
        values.map((i, elem) => {
          rowStr += ' ' + Cypress.$(elem).text() + ' '
        })
        firstRow = rowStr
      })
    cy.dataCy('menu')
      .click()
    cy.dataCy('listBlockchains').then(($el) => {
      var itemCount = Cypress.$($el).length - 1
      cy.log(itemCount)
      cy.get('.q-item__section--side')
        .eq(1)
        .click()
    })
    cy.dataCy('endpointOptions').then(($el) => {
      var itemCount = Cypress.$($el).length - 1
      cy.log(itemCount)
      cy.dataCy('endpointOptions')
        .eq(0)
        .click()
    })
    cy.wait('@graphql')
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
  })
})
