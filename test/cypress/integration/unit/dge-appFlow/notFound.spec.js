describe('Visit 404 not found page', () => {
  it('Visit', () => {
    cy.visit('/notFound')
    cy.get('.h1')
      .invoke('text')
      .should('be.equal', 'Page not found')
    cy.get('.message')
      .invoke('text')
      .should('be.equal', 'Sorry, we couldn’t find the page you’re looking for.')
    cy.viewport('iphone-8')
  })
})
