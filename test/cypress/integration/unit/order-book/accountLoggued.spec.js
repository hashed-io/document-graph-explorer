before(() => {
  cy.loginAnchor()
})
beforeEach(() => {
  // cy.loginAnchor()
  // spy on POST requests to /push_transaction TELOS endpoint
  cy.intercept('GET', '/sockjs-node/info?t=*').as('virtualScroll')
  // wait until response [30 sec to send sign transaction]
  // Expect response 202 from TLOS
  cy.visit('/order-book')
  cy.wait('@virtualScroll', { timeout: 30000 }).its('response.statusCode').should('eq', 200)
})

describe('Only can trade if user is logged', () => {
  it('Create an buy order', () => {
    cy.dataCy('createOrderBuy')
      .click()
    cy.url().should('include', '/login')
  })
  it('Create an Sell order', () => {
    cy.dataCy('createOrderSell')
      .click()
    cy.url().should('include', '/login')
  })
  it('Accept offer in buy orders', () => {
    // Click in row of table
    cy.contains('123')
      .parent('tr')
      .within(() => {
      // all searches are automatically rooted to the found tr element
        cy.get('td').eq(0).contains('token test')
        cy.get('td').eq(1).contains('123')
        cy.get('td').eq(2).contains('dao test')
        cy.get('td').eq(3).contains('124')
        cy.get('td').eq(0).click()
        cy.url().should('include', '/login')
      })
  })
  it('Accept offer in sell orders', () => {
    // Click in row of table
    cy.get('table')
      .eq(0)
      .within(() => {
        cy.get('td').eq(1).click()
        cy.url().should('include', '/login')
      })
  })
  it('Account information is not visible', () => {
    cy.dataCy('accountInfo')
      .should('not.be.visible')
  })
})
