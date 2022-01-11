beforeEach(() => {
  // spy on POST requests to /push_transaction TELOS endpoint
  cy.intercept('GET', '/sockjs-node/info?t=*').as('responseExample')
  // wait until response [30 sec to send sign transaction]
  // Expect response 202 from TLOS
  cy.wait('@responseExample', { timeout: 30000 })
    .its('response.statusCode')
    .should('eq', 200)

  // EXAMPLE 2
  // spy on POST requests to /push_transaction TELOS endpoint
  cy.intercept('POST', 'https://hashed.systems/alpha-trace-test/graphql').as('graphql')
  // wait until response [30 sec to send sign transaction]
  // Expect response 202 from TLOS
  cy.wait('@graphql').then((interception) => {
    console.log(interception)
    expect(interception.response.body).to.have.ownProperty('data')
  })
})
