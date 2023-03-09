describe('login', () => {
  it('login page', () => {
      cy.visit('https://staging.arthuronline.co.uk/login?X-MODE=QA-eW91LXdpbi1ub3RoaW5nCg')
      cy.get('[id=UserEmail]').type('robot+tester_1@firecreekweb.com')
      cy.get('[name="data[User][password]"]').type('Qwerty66#')
      cy.get('input[type=submit]').click()
      // Assert
      cy.get('.personal-name').should('have.text','Cypress Tester 1')
  })
})
