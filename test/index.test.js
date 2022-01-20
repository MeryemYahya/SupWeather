const app = require('../app')
const request = require('supertest')
const chai = require('chai'),
    expect = chai.expect;


describe('Singup', () => {
    it('Email already used', done => {
        request(app)
            .post('/singup')
            .send({
                login: 'email1@email.com',
                password: 'psdpsdpsd',
                passwordC: 'psdpsdpsd',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.text).to.equal("utilisé")
                done()
            })
    })

    it('Empty fields sended', done => {
        request(app)
            .post('/singup')
            .send()
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.text).to.equal("empty fields")
                done()
            })
    })

    it('Password and confirmation password are not identique', done => {
        request(app)
            .post('/singup')
            .send({
                login: 'email@email.com',
                password: 'psdpsdpsd',
                passwordC: 'psdpsd',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.text).to.equal("non identique")
                done()
            })
    })

    it('Password or/and email don\'t match criteria ', done => {
        request(app)
            .post('/singup')
            .send({
                login: 'email',
                password: 'psd',
                passwordC: 'psd',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.text).to.equal("error")
                done()
            })
    })

    it('singup done ', done => {
        request(app)
            .post('/singup')
            .send({
                login: 'test@email.com',
                password: 'password',
                passwordC: 'password',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.equal("Done")
                done()
            })
    })

})

describe('Login', () => {

    it('Empty Fields sended', done => {
        request(app)
            .post('/login')
            .send()
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.text).to.equal('empty fields')
                done()
            })

    })

    it('Email not found', done => {
        request(app)
            .post('/login')
            .send({
                login: 'e@email.com',
                password: 'psdpsdpsd',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.text).to.equal('non trouvé')
                done()
            })

    })

    it('Password incorrect', done => {
        request(app)
            .post('/login')
            .send({
                login: 'email1@email.com',
                password: 'psd',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.text).to.equal('mdp incorrect')
                done()
            })

    })

    it('should be able to login', done => {
        request(app)
            .post('/login')
            .send({
                login: 'email1@email.com',
                password: 'psdpsdpsd',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.equal('aut')
                done()
            })

    })
})

describe('Get cities', () => {

    it('should be able to get cities', done => {
        request(app)
            .get('/cities/email1@email.com')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done()
            })

    })

    it('should not be able to get cities', done => {
        request(app)
            .get('/cities/email@email.com')
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                done()
            })

    })

    it('Email not send in params', done => {
        request(app)
            .get('/cities/')
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done()
            })

    })
})

describe('Logout', () => {
    it('should be able to logout', done => {
        request(app)
            .post('/logout')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.equal('logout');
                done()
            })

    })
})

describe('Add city', () => {
    it('it should be able to add city', done => {
        request(app)
            .post('/cities')
            .send({
                login: "email1@email.com",
                name: "Mohammedia",
                id: "6547301"
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.equal('added')
                done()
            })

    })

    it('City already added', done => {
        request(app)
            .post('/cities')
            .send({
                login: "email1@email.com",
                name: "Mohammedia",
                id: "6547301"
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.text).to.equal('existed')
                done()
            })

    })

    it('Login not send', done => {
        request(app)
            .post('/cities')
            .send({
                name: "Mohammedia",
                id: "6547301"
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.text).to.equal('login required')
                done()
            })

    })

    it('Error', done => {
        request(app)
            .post('/cities')
            .send({
                login: "em@email.com",
                name: "Mohammedia",
                id: "6547301"
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.text).to.equal('error')
                done()
            })

    })

})

describe('Delete city', () => {
    it('it should be able to delete city', done => {
        request(app)
            .put('/cities')
            .send({
                login: "email1@email.com",
                name: "Mohammedia",
                id: "6547301"
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.equal('removed')
                done()
            })

    })

    it('Error', done => {
        request(app)
            .put('/cities')
            .send({
                login: "em@email.com",
                name: "Mohammedia",
                id: "6547301"
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.text).to.equal('error')
                done()
            })

    })

    it('Login not send', done => {
        request(app)
            .put('/cities')
            .send({
                name: "Mohammedia",
                id: "6547301"
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.text).to.equal('login required')
                done()
            })

    })
})