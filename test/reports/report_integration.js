process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Reports', () => {
    describe('Get /reports', () => {
        it('Should return reports as object', (done) => {
            chai.request(server)
                .get("/reports")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });

        it('Should return a single report', (done) => {
            chai.request(server)
                .get("/reports/1")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });

    describe('POST /reports/create', () => {
        it('Should create a report', (done) => {
            let data = {
                title: "testTitle1",
                content: "testContent"
            };
            chai.request(server)
                .post("/reports/create")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });

    describe('PUT /reports/edit', () => {
        it('Should edit a report and return 200', (done) => {
            let data = {
                id: 1,
                title: "testTitle1",
                content: "testContent"
            };
            chai.request(server)
                .put("/reports/edit")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });

    describe('DELETE /reports/delete/:id', () => {
        it('Should edit a report and return 200', (done) => {
            let data = {
                id: 1,
                title: "testTitle1",
                content: "testContent"
            };
            chai.request(server)
                .delete("/reports/delete/1")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });
});

