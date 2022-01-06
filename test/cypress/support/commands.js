// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import Faker from 'faker'
import 'cypress-file-upload'
Cypress.Commands.add('listDocs', (endpoint, search) => {
  // 'https://alpha-st.tekit.io/graphql'
  // 'https://hashed.systems/alpha-dge-test/graphql'
  // 'https://hashed.systems/alpha-trace-test/graphql'
  let endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
  if (endpoint) {
    cy.visit('/?endpoint=' + endpoints[endpoint])
  }
  if (search) {
    cy.dataCy('search')
      .type(search)
  }
})
Cypress.Commands.add('SaveBlockChain', () => {
  cy.dataCy('saveDataButton')
    .click()
  // spy on POST requests to /push_transaction TELOS endpoint
  cy.intercept('POST', 'https://test.telos.kitchen/v1/chain/push_transaction').as('sendSignature')
  // wait until response [30 sec to send sign transaction]
  // Expect response 202 from TLOS
  cy.wait('@sendSignature', { timeout: 30000 }).its('response.statusCode').should('eq', 202)
})
Cypress.Commands.add('fillCryptoDialog', (key) => {
  // Encryption dialog
  cy.dataCy('checkboxEncrypt')
    .click()
  cy.get('body').then((body) => {
    if (body.find('[data-cy="cryptoDialog"]').length > 0) {
      cy.log('Crypto Dialog Fill')
      cy.dataCy('keyInput')
        .should('be.visible')
        .type(key)
      cy.dataCy('confirmKey')
        .click()
    } else {
      cy.log('Without Crypto Dialog')
    }
  })
})
Cypress.Commands.add('dateTimeInput', (dataCy, date, time) => {
  cy.dataCy(dataCy)
    .type(date + ' ' + time)
})
/**
   * @param {string} dataCy
   * @param {boolean} encrypt?
   * @param {boolean} ipfs?
   * @param {string} fakeValue
   * @param {boolean} isEdit?
*/
Cypress.Commands.add('stringLabelFill', (dataCy, encrypt, ipfs, fakeValue, isEdit) => {
  const dataCyIpfs = 'ipfsToggle'

  if (ipfs) {
    cy.dataCy(dataCyIpfs)
      .click()
  }
  if (encrypt) {
    cy.fixture('key.json').then((json) => {
      // load data from logo.png
      cy.fillCryptoDialog(json.keyToEncrypt)
    })
  }
  if (!isEdit) {
    cy.dataCy(dataCy)
      .type(fakeValue)
  } else {
    cy.dataCy(dataCy)
      .clear()
      .type(fakeValue)
  }
})
/**
 *
 */
Cypress.Commands.add('fileLabelFill', (fileName, encrypt) => {
  let dataCy = 'fileInput'
  // fakeValue = 'test'
  cy.dataCy(dataCy)
    .attachFile(fileName)
  if (encrypt) {
    cy.fixture('key.json').then((json) => {
      // load data from logo.png
      cy.fillCryptoDialog(json.keyToEncrypt)
    })
  }
})
/**
 *  key String
 *  Value String
 *  dataType Int []
 */
Cypress.Commands.add('fillRow', (keyValue, dataType, obj) => {
  if (obj.isFirst) {
    switch (dataType) {
      // String
      case 0:
        // cy.log('String Label')
        cy.dataCy('keyField')
          .type('L')
          .clear()
          .type(Faker.lorem.sentence())
        cy.dataCy('valueField')
          .type('L')
          .clear()
          .type(Faker.lorem.sentence())
        break
    }
  }
})
Cypress.Commands.add('fillRowEdit', (dataType) => {
  cy.log(typeof dataType + '||' + dataType)
  switch (dataType) {
    // String
    case 'string':
      // cy.log('String Label')
      cy.dataCy('keyField')
        .type('L')
        .clear()
        .type(Faker.lorem.sentence())
      cy.dataCy('valueField')
        .type('L')
        .clear()
        .type(Faker.lorem.sentence())
      break
    case 'int64':
      cy.dataCy('keyField')
        .type('L')
        .clear()
        .type(Faker.lorem.sentence())
      cy.dataCy('valueField')
        .type('0')
        .clear()
        .type(Faker.datatype.number)
      break
    case 'name':
      cy.dataCy('keyField')
        .type('L')
        .clear()
        .type(Faker.lorem.sentence())
      cy.dataCy('valueField')
        .type('0')
        .clear()
        .type(Faker.lorem.word())
      break
  }
})
Cypress.Commands.add('addNewContent', () => {

})
Cypress.Commands.add('addNewLabel', (typeLabelNumber, withCheckBox) => {
  let fakeValue
  let dataCy
  let fieldName = Faker.name.findName()
  // Open modal to create new Label
  cy.get('#addFieldButton')
    .click()
  // Fill field name input
  cy.dataCy('FieldNameInput')
    .type(fieldName)
    // Open selector in the modal
  cy.dataCy('typeInput')
    .click()
    .get('.q-item__label')
    .eq(typeLabelNumber)
    .click()
  switch (typeLabelNumber) {
    // String
    case 0:
      cy.log('String Label')
      dataCy = 'stringInput'
      let encrypt = true
      let ipfs = Faker.datatype.boolean()
      let isEdit = false
      fakeValue = Faker.name.findName()
      cy.stringLabelFill(dataCy, encrypt, ipfs, fakeValue, isEdit)
      break
      // Asset
    case 1:
      dataCy = 'assetInput'
      fakeValue = Faker.finance.amount() + ' TLOS'
      cy.dataCy(dataCy)
        .type(fakeValue)
      break
      // Name
    case 2:
      dataCy = 'nameInput'
      fakeValue = 'alejandroga1'
      cy.dataCy(dataCy)
        .type(fakeValue)
      break
      // Int 64
    case 3:
      dataCy = 'inputLabel'
      fakeValue = Faker.datatype.number()
      cy.dataCy(dataCy)
        .type(fakeValue)
      break
      // Time point
    case 4:
      dataCy = 'timePointInput'
      let date = '2021-10-16'
      let time = '14:04'
      cy.dateTimeInput(dataCy, date, time)
      // fakeValue = Faker.datatype.datetime()
      break
      // Checksum
    case 5:
      dataCy = 'checkSumInput'
      fakeValue = 'Bdf12Fcb73D8eF8Ba771fbAC5B274D29DA12aa2CBEaacB7Da1239884e1174B8c'
      cy.dataCy(dataCy)
        .type(fakeValue)
      break
      // File
    case 6:
      // Files must exist inside of folder /fixture
      let fileName = 'pdf-test.pdf'
      let encryptFile = Faker.datatype.boolean()
      cy.fileLabelFill(fileName, encryptFile)
      break
  }

  // Click in add field Button
  cy.dataCy('addFieldButton')
    .click()
})
Cypress.Commands.add('qSelect', (dataCy, element) => {
  cy.dataCy(dataCy)
    .click()
    .get('.q-item__label')
    .eq(element)
    .click()
})
Cypress.Commands.add('loginAnchor', () => {
  window.localStorage.setItem('anchor-link--tlaclocmant2@active-1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f', '{"type":"channel","data":{"identifier":"DAO LLC","chainId":"1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f","auth":{"actor":"tlaclocmant2","permission":"active"},"publicKey":"PUB_K1_52qknGJh69NqfFL2sZfiuNtSYrR41B38w18gX1rbaoPFdgBmjx","channel":{"url":"https://cb.anchor.link/d7823778-be21-4948-8045-750deb6e0017","key":"PUB_K1_8JsjM2qx7nU56FHpAvP8eJ6EyggcV9yMvaWwuscTkoB4eRnmTS","name":"Anchor Desktop"},"requestKey":"PVT_K1_2EskFCrXf8gLoH98dJRVC2Dp2bNSwnNAkTk9SNwhXMinpxVDP6"},"metadata":{"sameDevice":true,"timeout":120000,"name":"Anchor Desktop","request_key":"PUB_K1_5opVQfy7TG4R4ifuX7yR8PX6AhCaQ6T8nyQHaZ1wDYzMUH9z92"}}')
  window.localStorage.setItem('account', 'tlaclocmant2')
  window.localStorage.setItem('autoLogin', 'Anchor')
  window.localStorage.setItem('anchor-link--list', '[{"auth":{"actor":"tlaclocmant2","permission":"active"},"chainId":"1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f"}]')
  window.localStorage.setItem('returning', true)
})
Cypress.Commands.add('logoutAnchor', () => {
  window.localStorage.clear()
})

Cypress.Commands.add(
  'dataCy',
  {
    prevSubject: 'optional'
  },
  (subject, value) => {
    return cy.get(`[data-cy=${value}]`, {
      withinSubject: subject
    })
  }
)

Cypress.Commands.add('testRoute', (route) => {
  cy.location().should((loc) => {
    if (loc.hash.length > 0) {
      // Vue-Router in hash mode
      expect(loc.hash).to.contain(route)
    } else {
      // Vue-Router in history mode
      expect(loc.pathname).to.contain(route)
    }
  })
})

// these two commands let you persist local storage between tests
const LOCAL_STORAGE_MEMORY = {}

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key]
  })
})

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
  })
})
