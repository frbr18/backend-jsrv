process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
const db = require("../../db/database.js");

chai.should();

chai.use(chaiHttp);

describe('Users', () => {
    describe('POST /register', () => {
        before(function () {
            let sql = "DELETE FROM users;";
            db.run(sql, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        })
        it('Should register an', (done) => {
            let data = {
                name: "testname",
                email: "test@email.com",
                password: "123test",
                date: "1990-09-27"
            }
            chai.request(server)
                .post("/user/register")
                .send({
                    name: "testname",
                    email: "test2@email2.com",
                    password: "123test",
                    date: "1990-09-27"
                })
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });

        it('Should get 500 for unqie mail.', (done) => {
            let data = {
                name: "testname",
                email: "test@email.com",
                password: "123test",
                date: "1990-09-27"
            }
            chai.request(server)
                .post("/user/register")
                .send({
                    name: "testname",
                    email: "test2@email2.com",
                    password: "123test",
                    date: "1990-09-27"
                })
                .end((err, res) => {
                    res.should.have.status(500);

                    done();
                });
        });
    });
    describe('POST /login', () => {
        it('Should get a 200 login success', (done) => {
            let data = {
                email: "test2@email2.com",
                password: "123test",
            }
            chai.request(server)
                .post("/user/login")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });

        it('Should get a 401 lack of email', (done) => {
            let data = {
                password: "123test",
            }
            chai.request(server)
                .post("/user/login")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });

        it('Should get a 401 with wrong password', (done) => {
            let data = {
                email: "test2@email2.com",
                password: "123tesst",
            }
            chai.request(server)
                .post("/user/login")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });
    });
});
