
describe('login', () => {
  it('Scaenario 1 - login page', () => {
    cy.fixture(Cypress.env('ENV')+ '/TestData.json').then((testData)=>{
      cy.userloginArthurOnlineSuccess(testData.arthur.username, testData.arthur.password, testData.arthur.name)

  })
})
})
