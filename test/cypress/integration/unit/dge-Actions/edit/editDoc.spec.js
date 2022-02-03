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
    cy.dataCy('editButton')
      .click()
  })
})
describe('Edit the Document', () => {
  it('Edit the system node label', () => {
    cy.dataCy('editRowButton').then(($el) => {
      var itemCount = Cypress.$($el).length - 1
      Cypress._.times(itemCount, (k) => {
        let fakeValue = Faker.datatype.number()
        cy.dataCy('editRowButton')
          .eq(k)
          .click()
        if (k > 0) {
          cy.dataCy('selectType').then(($b) => {
            cy.dataCy('keyField')
              .type('{selectall}{backspace}')
              .type(Faker.lorem.sentence())
            cy.dataCy('valueField')
              .type('{selectall}{backspace}')
              .type(Faker.datatype.number())
            cy.log('👌')
            cy.dataCy('saveEdit')
              .click()
          })
        } else {
          fakeValue = Faker.lorem.words()
          cy.dataCy('valueField')
            .type('{selectall}{backspace}')
            .type(fakeValue)
          cy.dataCy('saveEdit')
            .click()
        }
      })
    })
  })
})
// describe('Extend document [For]', () => {
//   Cypress._.times(2, (k) => {
//     it('Fill random information', () => {
//       cy.dataCy('newContentButton')
//         .click()
//       cy.dataCy('editTitleButton').then(($el) => {
//         var itemCount = Cypress.$($el).length - 1
//         cy.dataCy('editTitleButton')
//           .eq(itemCount)
//           .click()
//       })
//       cy.dataCy('titleInput')
//         .type('L')
//         .clear()
//         .type(Faker.name.findName())
//       cy.dataCy('saveTitleButton')
//         .click()
//       cy.dataCy('editRowButton').then(($el) => {
//         var itemCount = Cypress.$($el).length - 1
//         cy.dataCy('editRowButton')
//           .eq(itemCount)
//           .click()
//       })
//       let keyValue = Faker.company.companyName() + k
//       let dataType = 0
//       cy.fillRow(keyValue, dataType, { isFirst: true, isEncrypt: false, isIPFS: false })
//       cy.dataCy('saveEdit')
//         .click()
//     })
//   })
// })
describe('Save doc', () => {
  it('Saving using Anchor', () => {
    cy.dataCy('saveDoc')
      .click()
  })
})
describe('Assert the transaction', () => {
  it('Assert the correct transaction', () => {
    cy.get('[class=anchor-link-manual]')
      .invoke('text')
      .should('be.equal', 'Sign manually or with another device')
    cy.get('[class=anchor-link-close]')
      .click()
  })
})
