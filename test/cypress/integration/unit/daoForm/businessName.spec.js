
describe('Business Name rules', () => {
  beforeEach(() => {
    cy.loginAnchor()
    cy.visit('/home')
    cy.dataCy('createNewDAOButton')
      .click()
  })
  it('Get error if Not contain DAO LLC [fail]', () => {
    cy.dataCy('businessInput')
      .clear()
      .get('.q-field__messages')
      .contains('This field is required')
  })
  it('Not error if contain DAO LLC [success]', () => {
    cy.dataCy('businessInput')
      .clear()
      .type('ACME DAO LLC')
      .get('.q-field__messages').should('have.value', '')
  })
  it('Confirm input [success]', () => {
    cy.dataCy('confirmNameInput')
      .clear()
      .type('ACME DAO LLC')
      .get('.q-field__messages')
      .should('have.value', '')
  })
  it('Confirm input [Fail]', () => {
    cy.$t('common.appName').then(val => {
    })
    cy.dataCy('confirmNameInput')
      .clear()
      .type('ACME!')
      .get('.q-field__messages')
      .contains('The Business Entity Name and Confirm Name must match exactly.')
  })
})
