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
Cypress.Commands.add('loginAnchor', () => {
  window.localStorage.setItem('anchor-link--alejandroga1@active-1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f', '{"type":"channel","data":{"identifier":"DAO LLC","chainId":"1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f","auth":{"actor":"alejandroga1","permission":"active"},"publicKey":"PUB_K1_6i2Q4Lwa4H75PtTZ9jWaFXVDywLjG7Qt8vqMsW2u4FefNHWLvV","channel":{"url":"https://cb.anchor.link/d7823778-be21-4948-8045-750deb6e0017","key":"PUB_K1_8JsjM2qx7nU56FHpAvP8eJ6EyggcV9yMvaWwuscTkoB4eRnmTS","name":"Anchor Desktop"},"requestKey":"PVT_K1_2eLwYYJrCqbYjoFcce7p6R1sfiuUHC6sbtpC9kX6AdRefuXNwP"},"metadata":{"sameDevice":true,"timeout":120000,"name":"Anchor Desktop","request_key":"PUB_K1_6nyys4e9AzGhFDnJ7aBBo1Nuyk642PpVxCw5ncKVQu7gLVYtud"}}')
  window.localStorage.setItem('account', 'alejandroga1')
  window.localStorage.setItem('autoLogin', 'Anchor')
  window.localStorage.setItem('anchor-link--list', '[{"auth":{"actor":"alejandroga1","permission":"active"},"chainId":"1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f"}]')
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
