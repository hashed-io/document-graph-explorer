const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 2
beforeEach(() => {
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
})
describe('Any user can search into the Graph [id version]', () => {
  // ID version
  var sucessSearch = '2'
  var failSearch = '$$$$$'
  it('Success search', () => {
    cy.listDocs(2, sucessSearch)
    cy.get('tr')
      .should('exist')
      // cy.intercept('POST', endpoints[2]).as('graphql')
      // cy.wait('@graphql')
      // .its('response.body.data.queryDocument.length')
      // .should('be.greaterThan', 0)
  })
  it('Failed search', () => {
    cy.listDocs(2, failSearch)
    cy.get('tr')
      .eq(1)
      .should('not.exist')
  })
})

describe('Any user can search into the Graph [hash version]', () => {
  var sucessSearch = 'eb0ba382cb35b2be2fad2ebc4d64430391393ac0959dd257e04f136b2944599a'
  var failSearch = '$$$$$'
  it('Success search', () => {
    cy.listDocs(endpointSelect, sucessSearch)
    cy.get('tr')
      .should('exist')
    // cy.intercept('POST', endpoints[endpointSelect]).as('graphql')
    // cy.wait('@graphql', { timeOut: 3000 })
    //   .its('response.body.data.queryDocument.length')
    //   .should('be.greaterThan', 0)
  })
  it('Failed search', () => {
    cy.listDocs(endpointSelect, failSearch)
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)
    cy.get('tr')
      .eq(1)
      .should('not.exist')
    // cy.intercept('POST', endpoints[endpointSelect]).as('graphql')
    // cy.wait('@graphql')
    //   .its('response.body.data.queryDocument.length')
    //   .should('eq', 0)
  })
})
