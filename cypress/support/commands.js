
Cypress.Commands.add("userloginArthurOnlineSuccess", (username, password, name) => {
    cy.visit('')
    cy.get('[id=UserEmail]').type(username)
    cy.get('[name="data[User][password]"]').type(password)
    cy.get('input[type=submit]').click()
    cy.get('.personal-name').should('have.text', name)
 });

 Cypress.Commands.add("verifyPropertiesTableDataByClass", (rowNo,className, value) => {
    cy.get('.properties').find('tr').eq(rowNo).find('.'+className).should('contain', value , {
        timeout: 10000
    })
 });

 Cypress.Commands.add("selectUnitSettingComboBoxItemByText", (locator, value) => {
    cy.get('.unit-setting.let-component').find(locator).click()
    cy.get('div[id=\'select2-drop\'] input[type=\'text\']').type(value)
    cy.get('.select2-result-label').click()
 });

 Cypress.Commands.add("setOwnerIdForEachUnit", (index,text) => { 
    for (let i = 1; i <= index; i += 1) {    // nth-child is 1-based not 0-based
        cy.get('.multi-unit-table.let-component').find('tr').eq(i).find('select[id=\'MultiUnitIdUnitOwnerId\']').select(text)
      }
   });
