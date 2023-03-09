describe('add property', () => {

  beforeEach(() => {
    //generate unique id for test
      cy.visit('https://staging.arthuronline.co.uk/login?X-MODE=QA-eW91LXdpbi1ub3RoaW5nCg')
      cy.get('[id=UserEmail]').type('robot+tester_1@firecreekweb.com')
      cy.get('[name="data[User][password]"]').type('Qwerty66#')
      cy.get('input[type=submit]').click()
      cy.get('.personal-name').should('have.text', 'Cypress Tester 1')
    })

  it('add property multiple rentable', () => {
      
      //
      const uuid = () => Cypress._.random(0, 1e6)
      const id = uuid()
      const testid = `id${id}`
      const address = `test123`

      //Go to Properties
      cy.get('a[title=\'Properties\']').click()

      // Add property
      cy.contains(' Add Property').click()
      cy.get('div[data-file-name=\'multiple-unit.svg\'').click({ timeout: 10000 })
      cy.get('.property-name-ref').find('input[id=\'ProfileAddressName\']').type(testid)
      cy.get('#s2id_PropertyOwnerId').children('.select2-choice').click()
      cy.get('.select2-result-label').contains('Owner 1 - Sansiri').click()
      cy.get('.address').find('input[id=\'ProfileAddress1\']').type(address)
      cy.get('#PropertyFullAccess').then((body) => {
           if (body.is('not','checked')) {
               body.click()
           }
       })
      cy.get('#PropertyFullAccess').should('be.checked')
      cy.get('#PropertyUnitCount').clear()
      cy.get('#PropertyUnitCount').type('2')
      cy.get('input[value=\'Next, Units Settings \']').click()

       // Unit Setting
      cy.get('.unit-setting.let-component').find('select[data-select-add-model=\'UnitType\']').select('Flat')
      
      cy.get('.unit-setting.let-component').find('#s2id_PrefixUnitUnitOwnerId').click()
      cy.get('div[id=\'select2-drop\'] input[type=\'text\']').type('Owner 1 - Sansiri')
      cy.get('.select2-result-label').click()

      cy.get('.unit-setting.let-component').find('#s2id_PrefixUnitUnitManagerManagerPersonId').click()
      cy.get('div[id=\'select2-drop\'] input[type=\'text\']').type('Cypress Tester 1')
      cy.get('.select2-result-label').click()

      cy.get('.unit-setting.let-component').find('#s2id_PrefixUnitUnitAgentEntityId').click()
      cy.get('div[id=\'select2-drop\'] input[type=\'text\']').type('Real Agency')
      cy.get('.select2-result-label').click()

      cy.get('.unit-setting.let-component').find('#s2id_RequiredCertificateMultiUnitUnitRequiredCertificateTypeIds').type('Fire Alarm')
      cy.get('.select2-result-label').click()
      cy.get('.multi-unit-table.let-component').find('tr').eq(1).find('select[id=\'MultiUnitIdUnitOwnerId\']').select('Owner 1 - Sansiri')
      cy.get('.multi-unit-table.let-component').find('tr').eq(2).find('select[id=\'MultiUnitIdUnitOwnerId\']').select('Owner 1 - Sansiri')
      cy.get('input[value=\'Add Property\']').click()
      // Verify success page
      cy.contains(testid).should('contain', testid)

      //Assert value after create
      cy.get('a[title=\'Properties\']').click()
      cy.get('#_q').type(testid)
      cy.get('.submit').find('.btn').click()
      cy.get('.properties').find('tr').eq(1).find('.table-info').should('contain', testid, { timeout: 10000 })
      cy.get('.properties').find('tr').eq(1).find('.unimportant').should('contain', address+address)
      cy.get('.properties').find('tr').eq(1).find('.property-description').should('contain', 'Multiple Units')
      cy.get('.properties').find('tr').eq(1).find('.property-type').should('contain', 'Residential')
      cy.get('.properties').find('tr').eq(1).find('.owner').should('contain', 'Owner 1 - Sansiri')
      cy.get('.properties').find('tr').eq(1).find('.rentable-units ').should('contain', '2/2')
      
  })
})