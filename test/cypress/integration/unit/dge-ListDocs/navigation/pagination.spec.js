before(() => {
  // 'https://alpha-st.tekit.io/graphql'
  // 'https://hashed.systems/alpha-dge-test/graphql'
  // 'https://hashed.systems/alpha-trace-test/graphql'
  cy.listDocs(0)
})
describe('Any user can navigate through the Graph', () => {
  it('Next page', () => {
    cy.dataCy('nextPage')
      .click()
  })
})
