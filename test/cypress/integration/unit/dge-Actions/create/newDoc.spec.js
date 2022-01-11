import Faker from 'faker'
const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 0
before(() => {
  cy.loginAnchor()
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
  cy.dataCy('loginButton')
    .click()
})
describe('Create new Document', () => {
  it('Fill system node label table', () => {
    let fakeValue = Faker.lorem.sentence()
    cy.dataCy('newDocButton')
      .click()
    cy.dataCy('selectDocType')
      .click()
      .click()
    cy.get('.q-virtual-scroll__content')
      .children()
      .eq(2)
      .click()
    cy.dataCy('editRowButton')
      .click()
    cy.dataCy('valueField')
      .type('L')
      .clear()
      .type(fakeValue)
    cy.dataCy('saveEdit')
      .click()
  })
})
describe('Create new document [For]', () => {
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
        .type('L')
        .clear()
        .type(Faker.name.findName())
      cy.dataCy('saveTitleButton')
        .click()
      cy.dataCy('editRowButton').then(($el) => {
        var itemCount = Cypress.$($el).length - 1
        cy.dataCy('editRowButton')
          .eq(itemCount)
          .click()
      })
      let keyValue = Faker.company.companyName() + k
      let dataType = 0
      cy.fillRow(keyValue, dataType, { isFirst: true, isEncrypt: false, isIPFS: false })
      cy.dataCy('saveEdit')
        .click()
      // Cypress._.times(2, (k) => {
      //   cy.addNewContent()
      //   cy.dataCy('addRowButton')
      //     .eq(1)
      //     .click()
      // })
    })
  })
})
describe('Save doc', () => {
  it('Saving using Anchor', () => {
    cy.dataCy('saveDoc')
      .click()
  })
})
