describe('login', () => {

    it('Scaenario 3 - get user', () => {
        let reqesUrl = Cypress.env('reqesUrl')
        cy.log(reqesUrl)
        cy.api({
            method: 'GET',
            url: reqesUrl + 'api/users?page=2'
        }).then((response) => {
            expect(response.body).to.contain({page: 2})
            expect(response.body).to.contain({per_page: 6})
            expect(response.body).to.contain({total: 12})
            expect(response.body).to.contain({total_pages: 2})
            expect(response.body.data[0]).to.contain({
                "id": 7,
                "email": "michael.lawson@reqres.in",
                "first_name": "Michael",
                "last_name": "Lawson",
                "avatar": "https://reqres.in/img/faces/7-image.jpg"
            })
            expect(response.body.data[1]).to.contain({
                "id": 8,
                "email": "lindsay.ferguson@reqres.in",
                "first_name": "Lindsay",
                "last_name": "Ferguson",
                "avatar": "https://reqres.in/img/faces/8-image.jpg"
            })
            expect(response.body.data[2]).to.contain( {
                "id": 9,
                "email": "tobias.funke@reqres.in",
                "first_name": "Tobias",
                "last_name": "Funke",
                "avatar": "https://reqres.in/img/faces/9-image.jpg"
            })
            expect(response.body.data[3]).to.contain({
                "id": 10,
                "email": "byron.fields@reqres.in",
                "first_name": "Byron",
                "last_name": "Fields",
                "avatar": "https://reqres.in/img/faces/10-image.jpg"
            })
            expect(response.body.data[4]).to.contain( {
                "id": 11,
                "email": "george.edwards@reqres.in",
                "first_name": "George",
                "last_name": "Edwards",
                "avatar": "https://reqres.in/img/faces/11-image.jpg"
            })
            expect(response.body.data[5]).to.contain({
                "id": 12,
                "email": "rachel.howell@reqres.in",
                "first_name": "Rachel",
                "last_name": "Howell",
                "avatar": "https://reqres.in/img/faces/12-image.jpg"
            })
        })
    })

    it('Scaenario 3 - login success', () => {
        let reqesUrl = Cypress.env('reqesUrl')
        cy.log(reqesUrl)
        cy.api({
            method: 'POST',
            url: reqesUrl + 'api/login',
            body: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        }).then((response) => {
            expect(response.body).to.contain({token: 'QpwL5tke4Pnpja7X4'})
            
        })
    })

    it('Scaenario 3 - login fail', () => {
        let reqesUrl = Cypress.env('reqesUrl')
        cy.log(reqesUrl)
        cy.api({
            method: 'POST',
            url: reqesUrl + 'api/login',
            failOnStatusCode: false,
            body: {
                "email": "peter@klaven"
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.contain({error: 'Missing password'})
            
        })
    })
})