import Faker from 'faker'
const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 2
before(() => {
  cy.loginAnchor()
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
  cy.dataCy('loginButton')
    .click()
})
describe('Visualize doc', () => {
  it('actions are shown', () => {
    cy.dataCy('rowDoc')
      .eq(1)
      .click()
    cy.scrollTo('bottom')
    cy.dataCy('extendButton')
      .click()
  })
})
describe('Edge Name', () => {
  it('Fill the edge name', () => {
    let edgeName = Faker.lorem.word()
    cy.dataCy('edgeNameInput')
      .type(edgeName)
  })
})
describe('Extend the Document', () => {
  it('Fill system node label table', () => {
    let fakeValue = Faker.lorem.word()
    cy.dataCy('editRowButton')
      .click()
    cy.dataCy('valueField')
      .type('L')
      .clear()
      .type(fakeValue)
    cy.dataCy('saveEdit')
      .click()
    cy.dataCy('addRowButton')
      .click()
  })
})
describe('Extend document [For]', () => {
  Cypress._.times(2, (k) => {
    it('Fill random information', () => {
      cy.dataCy('newContentButton')
        .click()
      cy.dataCy('editTitleButton').then(($el) => {
        var itemCount = Cypress.$($el).length - 1
        cy.dataCy('editTitleButton')
          .eq(itemCount)
          .click()
      })
      cy.dataCy('titleInput')
        .first()
        .type('L')
        .clear()
        .type(Faker.lorem.word())
      cy.dataCy('saveTitleButton')
        .click()
      cy.dataCy('addRowButton')
        .last()
        .click()
      let keyValue = Faker.lorem.word() + k
      let dataType = 0
      cy.fillRow(keyValue, dataType, { isFirst: true, isEncrypt: false, isIPFS: false })
      cy.dataCy('saveEdit')
        .click()
    })
  })
})
describe('Save doc', () => {
  it('Saving using Anchor', () => {
    cy.dataCy('saveDoc')
      .click()
  })
  it('Assert the correct transaction', () => {
    cy.get('[class=anchor-link-manual]')
      .invoke('text')
      .should('be.equal', 'Sign manually or with another device')
    cy.get('[class=anchor-link-close]')
      .click()
  })
})
