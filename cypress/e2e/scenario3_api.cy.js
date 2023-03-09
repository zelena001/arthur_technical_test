describe('Api Testing', () => {

    it('Scaenario 3.1 - get user', () => {
        cy.fixture(Cypress.env('ENV') + '/TestDataApi.json').then((testData) => {
            let reqesUrl = Cypress.env('reqesUrl')
            cy.log(reqesUrl)
            cy.api({
                method: 'GET',
                url: reqesUrl + 'api/users?page=2'
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.page).to.eq(testData.expected_api1.page)
                expect(response.body.per_page).to.eq(testData.expected_api1.per_page)
                expect(response.body.total).to.eq(testData.expected_api1.total)
                expect(response.body.total_pages).to.eq(testData.expected_api1.total_pages)
                expect(response.body.support).to.contain(testData.expected_api1.support)
                var index = Object.keys(testData.expected_api1.data).length;
                for (let i = 0; i < index; i += 1) {
                    expect(response.body.data[i]).to.contain(testData.expected_api1.data[i])
                }
            })


        })
    })


    it('Scaenario 3.2 - login success', () => {
        cy.fixture(Cypress.env('ENV') + '/TestDataApi.json').then((testData) => {
            let reqesUrl = Cypress.env('reqesUrl')
            cy.log(reqesUrl)
            cy.api({
                method: 'POST',
                url: reqesUrl + 'api/login',
                body: testData.api02.reqBody
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.contain(testData.api02.expected)
            })
        })
    })

    it('Scaenario 3.3 - login fail', () => {
        cy.fixture(Cypress.env('ENV') + '/TestDataApi.json').then((testData) => {
            let reqesUrl = Cypress.env('reqesUrl')
            cy.log(reqesUrl)
            cy.api({
                method: 'POST',
                url: reqesUrl + 'api/login',
                failOnStatusCode: false,
                body: testData.api03.reqBody
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.contain(testData.api03.expected)

            })
        })
    })
})