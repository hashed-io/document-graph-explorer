beforeEach(() => {
  cy.loginAnchor()
  cy.visit('/order-book')
  // spy on POST requests to /push_transaction TELOS endpoint
  cy.intercept('GET', '/sockjs-node/info?t=*').as('virtualScroll')
  // wait until response [30 sec to send sign transaction]
  // Expect response 202 from TLOS
  cy.visit('/order-book')
  cy.wait('@virtualScroll', { timeout: 30000 })
    .its('response.statusCode')
    .should('eq', 200)
  cy.dataCy('menuButton')
    .click()
  cy.dataCy('menuOrderBook')
    .click()
})

describe('Only can trade if user is logged', () => {
  it('Create an buy order and show modal', () => {
    cy.dataCy('createOrderBuy')
      .click()
    cy.dataCy('createOrderModal')
      .should('be.visible')
    cy.contains('Create Buy Order')
  })
  it('Create an Sell order and show modal', () => {
    cy.dataCy('createOrderSell')
      .click()
    cy.dataCy('createOrderModal')
      .should('be.visible')
    cy.contains('Create Sell Order')
  })
  it('Accept offer in buy orders and show modal', () => {
    // Click in row of table
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.contains('123')
      .parent('tr')
      .within(() => {
      // all searches are automatically rooted to the found tr element
        cy.get('td').eq(0).contains('token test')
        cy.get('td').eq(1).contains('123')
        cy.get('td').eq(2).contains('dao test')
        cy.get('td').eq(3).contains('124')
        cy.get('td').eq(0).click()
      })
    cy.dataCy('acceptOrderModal')
      .should('be.visible')
    cy.contains('token test')
    cy.contains('dao test')
    cy.contains('124')
    cy.contains('123')
  })
  it('Accept offer in sell orders and show modal', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get('table')
      .eq(0)
      .within(() => {
        cy.get('td').eq(1).click()
      })
    cy.dataCy('acceptOrderModal')
      .should('be.visible')
    cy.contains('Offer Buy')
  })
  it('Account information is visible', () => {
    cy.dataCy('accountInfo')
      .should('be.visible')
      .click()
    cy.dataCy('accountInfoCard')
      .should('be.visible')
    cy.contains('alejandroga1')
  })
})
