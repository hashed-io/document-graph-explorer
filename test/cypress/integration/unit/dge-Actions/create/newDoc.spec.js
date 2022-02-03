import Faker from 'faker'
const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 2
before(() => {
  cy.loginAnchor()
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
  cy.dataCy('loginButton')
    .click()
})
describe('Create new Document', () => {
  it('Open the create view', () => {
    cy.dataCy('newDocButton')
      .click()
  })
  it('Document type fill [type]', () => {
    cy.dataCy('docType')
      .last()
      .click()
      .type('newDocType')
      .type('{enter}')
    cy.dataCy('docType')
      .children()
      .eq(0)
      .should(($span) => {
        expect($span.text()).to.eq('newDocType')
      })
  })
  it('Document type fill [select]', () => {
    cy.dataCy('docType')
      .last()
      .click()
      .type('{backspace}')
    cy.get('.q-virtual-scroll__content')
      .children()
      .eq(0)
      .invoke('text')
      .then((text) => {
        var _text = text
        cy.get('.q-virtual-scroll__content')
          .children()
          .eq(0)
          .click()
        cy.dataCy('docType')
          .first()
          .should(($span) => {
            expect($span.text()).to.eq(_text)
          })
      })
  })
  it('Fill system node label table', () => {
    var fakeValue = Faker.lorem.sentence()
    cy.dataCy('editRowButton')
      .click()
    cy.dataCy('valueField')
      .type('L')
      .clear()
      .type(fakeValue, { delay: 0 })
    cy.dataCy('saveEdit')
      .click()
    cy.dataCy('valueRead')
      .should(($div) => {
        expect($div.text()).to.eq(fakeValue + '\n')
      })
  })
})
describe('Add new content group', () => {
  it('Fill title with random data', () => {
    // Button to add table
    cy.dataCy('newContentButton')
      .click()
    // Edit last title
    cy.dataCy('editTitleButton').then(($el) => {
      var itemCount = Cypress.$($el).length - 1
      cy.dataCy('editTitleButton')
        .eq(itemCount)
        .click()
    })
    cy.dataCy('titleInput')
      .type('{selectall}{backspace}')
      .type(Faker.name.findName())
    cy.dataCy('saveTitleButton')
      .click()
    // Fill last row
  })
})
describe('Fill new content group with labels', () => {
  it('Fill string label [Encrypt]', () => {
    cy.dataCy('addRowButton')
      .eq(1)
      .click()
    // Key value fill
    cy.dataCy('keyField')
      .type('{selectall}{backspace}')
      .type(Faker.lorem.word() + ' 0')
    // Value fill
    cy.dataCy('valueField')
      .clear()
      .type('Lorem')
    cy.dataCy('encryptToggle')
      .click()
    // crypto dialog
    cy.dataCy('keyInput')
      .type('1234')
    cy.dataCy('confirmKey')
      .click()
    // save the value edited
    cy.dataCy('saveEdit')
      .click()
    // Assert chip encrypt exist
    cy.dataCy('chipEncrypt')
      .should('exist')
    // add new Row
    cy.dataCy('addRowButton')
      .last()
      .click()
  })
  it('Fill string label [IPFS]', () => {
    // Fill the key & value
    cy.dataCy('keyField')
      .type(Faker.lorem.word() + ' 1')
    cy.dataCy('valueField')
      .type('Lorem')
    cy.intercept('POST', 'https://ipfs.infura.io:5001/api/v0/add?raw-leaves=true&pin=true').as('ipfs')
    cy.dataCy('ipfsToggle')
      .click()
      // save the value edited
    cy.dataCy('saveEdit')
      .click()
    cy.wait('@ipfs')
    // Assert chip IPFS exist
    cy.dataCy('chipIpfs')
      .should('exist')
    // add new Row
    cy.dataCy('addRowButton')
      .last()
      .click()
  })
  it('Fill checksum label', () => {
    // Key value fill
    cy.dataCy('keyField')
      .type(Faker.lorem.word() + ' 2')
    // changing the data type to checksum
    cy.dataCy('selectType')
      .click()
    cy.get('.q-virtual-scroll__content')
      .children()
      .eq(0)
      .click()
    // Value fill
    cy.dataCy('valueField')
      .type('abc67abc78ac78b789b8a90b8a90c890ca890808d980d890d8908b89089b0898', { delay: 0 })
    // save the value edited
    cy.dataCy('saveEdit')
      .click()
    cy.dataCy('valueRead')
      .last()
      .should(($div) => {
        expect($div.text()).to.eq('abc67abc78ac78b789b8a90b8a90c890ca890808d980d890d8908b89089b0898' + '\n')
      })
    // add new Row
    cy.dataCy('addRowButton')
      .last()
      .click()
  })
  it('Fill name label', () => {
    // Key value fill
    cy.dataCy('keyField')
      .type(Faker.lorem.word() + ' 3')
    // changing the data type to checksum
    cy.dataCy('selectType')
      .click()
    cy.get('.q-virtual-scroll__content')
      .children()
      .eq(1)
      .click()
    // Value fill
    cy.dataCy('valueField')
      .type('alejandroga1')
    // save the value edited
    cy.dataCy('saveEdit')
      .click()
    cy.dataCy('valueRead')
      .last()
      .should(($div) => {
        expect($div.text()).to.eq('alejandroga1' + '\n')
      })
    // add new Row
    cy.dataCy('addRowButton')
      .last()
      .click()
  })
  it('Fill time label', () => {
    // Key value fill
    cy.dataCy('keyField')
      .type(Faker.lorem.word() + ' 4')
    // changing the data type to checksum
    cy.dataCy('selectType')
      .click()
    cy.get('.q-virtual-scroll__content')
      .children()
      .eq(2)
      .click()
    // Value fill
    let date = Faker.datatype.number({ min: 2000, max: 2025 }) + '-12' + '-12'
    cy.dataCy('valueField')
      .type(date + '11:30', { delay: 0 })
    // save the value edited
    cy.dataCy('saveEdit')
      .click()
    // Assert
    cy.dataCy('valueRead')
      .last()
      .should(($div) => {
        expect($div.text()).to.eq(date + ' 11:30' + '\n')
      })
    // add new Row
    cy.dataCy('addRowButton')
      .last()
      .click()
  })
  it('Fill asset label', () => {
    // Key value fill
    cy.dataCy('keyField')
      .type(Faker.lorem.word() + ' 5')
    // changing the data type to checksum
    cy.dataCy('selectType')
      .click()
    cy.get('.q-virtual-scroll__content')
      .children()
      .eq(4)
      .click()
    // Value fill
    let numberRandom = Faker.datatype.number()
    cy.dataCy('valueField')
      .type(numberRandom + ' USD')
    // save the value edited
    cy.dataCy('saveEdit')
      .click()
    // Assert
    cy.dataCy('valueRead')
      .last()
      .should(($div) => {
        expect($div.text()).to.eq(numberRandom + ' USD' + '\n')
      })
    // add new Row
    cy.dataCy('addRowButton')
      .last()
      .click()
  })
  it('Fill int64 label', () => {
    // Key value fill
    cy.dataCy('keyField')
      .type(Faker.lorem.word() + ' 6')
    // changing the data type to checksum
    cy.dataCy('selectType')
      .click()
    cy.get('.q-virtual-scroll__content')
      .children()
      .eq(5)
      .click()
    // Value fill
    let numberRandom = Faker.datatype.number({ min: 1000, max: 2000 })
    cy.dataCy('valueField')
      .type(numberRandom)
    // save the value edited
    cy.dataCy('saveEdit')
      .click()
    // Assert
    cy.dataCy('valueRead')
      .last()
      .should(($div) => {
        expect($div.text()).to.eq(numberRandom + '\n')
      })
  })
})
describe('Assert the transaction', () => {
  it('Click on save button', () => {
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
