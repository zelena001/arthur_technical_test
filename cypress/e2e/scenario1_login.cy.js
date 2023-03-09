describe('login', () => {
  it('Scaenario 1 - login page', () => {
      cy.visit('')
      cy.get('[id=UserEmail]').type('robot+tester_1@firecreekweb.com')
      cy.get('[name="data[User][password]"]').type('Qwerty66#')
      cy.get('input[type=submit]').click()
      // Assert
      cy.get('.personal-name').should('have.text', 'Cypress Tester 1')
  })
})