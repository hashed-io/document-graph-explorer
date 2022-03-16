
const endpoints = ['https://alpha-st.tekit.io/graphql', 'https://hashed.systems/alpha-dge-test/graphql', 'https://hashed.systems/alpha-trace-test/graphql']
const endpointSelect = 2
before(() => {
  cy.visit('/?endpoint=' + endpoints[endpointSelect])
})
describe('Search the root node', () => {
  var sucessSearch = '0'
  it('Success search', () => {
    cy.intercept('POST', 'https://hypha.es.eu-west-1.aws.found.io:9243/traceability-documents/_search').as('elasticSearch')
    cy.listDocs(2, sucessSearch)
    cy.wait('@elasticSearch')
    cy.get('td')
      .eq(0)
      .invoke('text')
      .should('be.equal', '0')
      .should('exist')
    cy.get('td')
      .eq(0)
      .click()
  })
})
describe('Get edges and compare [created date desc]', () => {
  it('Get edges', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)
    cy.dataCy('edgeTable')
      .children()
      .first()
      .children()
    cy.get('[id=EdgeNext]')
      .first()
    cy.dataCy('createdDate')
      .first()
      .then((row) => {
        var firstDate = row.text().split('|')[1]
        cy.dataCy('createdDate')
          .last()
          .then((row2) => {
            var secondDate = row2.text().split('|')[1]
            function toDate (date) {
              let monthToNumber = {
                'Jan': '0',
                'Feb': '1',
                'Mar': '2',
                'Apr': '3',
                'May': '4',
                'Jun': '5',
                'Jul': '6',
                'Aug': '7',
                'Sep': '8',
                'Oct': '9',
                'Nov': '10',
                'Dec': '11'
              }
              let destrucDate = date.split(' ')
              return new Date(destrucDate[3], monthToNumber[destrucDate[2]], destrucDate[1].substring(1))
            }
            let first = toDate(firstDate)
            let second = toDate(secondDate)
            console.log({ first, second })
            expect(first).to.be.greaterThan(second)
          })
      })
  })
})
