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
      .eq(3)
      .click()
    cy.scrollTo('bottom')
    cy.dataCy('certifyButton')
      .click()
  })
})
describe('Certify the Document', () => {
  it('Fill the form signature', () => {
    cy.dataCy('signature')
      .type(Faker.lorem.sentence() + '\n')
      .type(Faker.lorem.sentence() + '\n')
      .type(Faker.lorem.sentence() + '\n')
  })
  it('Fill the crypto Dialog', () => {
    cy.dataCy('encryptSignatureToggle')
      .click()
    // Fill crypto dialog
    cy.dataCy('keyInput')
      .type('1234')
    cy.dataCy('confirmKey')
      .click()
  })
  it('Fill notes', () => {
    cy.dataCy('notes')
      .type(Faker.lorem.sentence() + '\n')
      .type(Faker.lorem.sentence() + '\n')
      .type(Faker.lorem.sentence() + '\n')
    cy.dataCy('encryptNotesToggle')
      .click()
    cy.dataCy('ipfsNotesToggle')
      .click()
  })
})

describe('Sign transaction', () => {
  it('Saving using Anchor', () => {
    cy.dataCy('certifyActionButton')
      .click()
  })
})
