
describe('Business Name tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('has steps information', () => {
    cy.dataCy('instructions')
      .should('contain', 'We’ve created')
      .and('contain', 'We’ve created this tool is to allow you to upload a copy of the official DAO LLC form to a public smart contract and help you comply with the DAO LLC requirement of generating a smart contract identifier required in Step 6 -')
      .and('contain', 'Step 1')
      .and('contain', 'Step 2')
      .and('contain', 'Step 3')
      .and('contain', 'Step 4')
  })
  it('has link to download Anchor Wallet', () => {
    cy.dataCy('linkAnchor')
      .should('have.attr', 'href')
      .and('contain', 'anchor')
  })
})
