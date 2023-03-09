describe('add property', () => {

  beforeEach(() => {
      //generate unique id for test
      cy.fixture(Cypress.env('ENV')+ '/TestData.json').then((testData)=>{
        cy.userloginArthurOnlineSuccess(testData.arthur.username, testData.arthur.password, testData.arthur.name)
  
    })
  })

  it('Scenario 2 - add property multiple rentable', () => {

      //
      const uuid = () => Cypress._.random(0, 1e6)
      const id = uuid()
      const testid = `id${id}`
      const address = 'test123'
      const unitNo = 2
      const owner = 'Owner 1 - Sansiri'
      //Go to Properties
      cy.get('a[title=\'Properties\']').click()

      // Add property
      cy.contains(' Add Property').click()
      cy.get('div[data-file-name=\'multiple-unit.svg\'', { timeout: 10000}).click({timeout: 10000})
      cy.get('.property-name-ref').find('input[id=\'ProfileAddressName\']').type(testid)
      cy.get('#s2id_PropertyOwnerId').children('.select2-choice').click()
      cy.get('.select2-result-label').contains(owner).click()
      cy.get('.address').find('input[id=\'ProfileAddress1\']').type(address)
      cy.get('#PropertyFullAccess').then((body) => {
          if (body.is('not', 'checked')) {
              body.click()
          }
      })
      cy.get('#PropertyFullAccess').should('be.checked')
      cy.get('#PropertyUnitCount').clear()
      cy.get('#PropertyUnitCount').type(unitNo)
      cy.get('input[value=\'Next, Units Settings \']').click()

      // Unit Setting
      cy.get('.unit-setting.let-component').find('select[data-select-add-model=\'UnitType\']').select('Flat')

      cy.selectUnitSettingComboBoxItemByText('#s2id_PrefixUnitUnitOwnerId',owner )
      cy.selectUnitSettingComboBoxItemByText('#s2id_PrefixUnitUnitManagerManagerPersonId','Cypress Tester 1' )
      cy.selectUnitSettingComboBoxItemByText('#s2id_PrefixUnitUnitAgentEntityId','Real Agency' )

      cy.get('.unit-setting.let-component').find('#s2id_RequiredCertificateMultiUnitUnitRequiredCertificateTypeIds').type('Fire Alarm')
      cy.get('.select2-result-label').click()
      // cy.get('.multi-unit-table.let-component').find('tr').eq(1).find('select[id=\'MultiUnitIdUnitOwnerId\']').select('Owner 1 - Sansiri')
      // cy.get('.multi-unit-table.let-component').find('tr').eq(2).find('select[id=\'MultiUnitIdUnitOwnerId\']').select('Owner 1 - Sansiri')
      cy.setOwnerIdForEachUnit(unitNo,'Owner 1 - Sansiri')

      cy.get('input[value=\'Add Property\']').click()
      // Verify success page
      cy.contains(testid).should('contain', testid)

      //Assert value after create
      cy.get('a[title=\'Properties\']').click()
      cy.get('#_q').type(testid)
      cy.get('.submit').find('.btn').click()
      cy.get('.properties').find('tr').eq(1).find('.table-info').should('contain', testid, {
          timeout: 10000
      })
      cy.verifyPropertiesTableDataByClass(1,'table-info',testid)
      // the address show duplicate address.
      cy.verifyPropertiesTableDataByClass(1,'unimportant',address + address)
      cy.verifyPropertiesTableDataByClass(1,'property-description','Multiple Units')
      cy.verifyPropertiesTableDataByClass(1,'property-type','Residential')
      cy.verifyPropertiesTableDataByClass(1,'owner',owner)
      cy.verifyPropertiesTableDataByClass(1,'rentable-units',unitNo+'/'+unitNo)
  })
})