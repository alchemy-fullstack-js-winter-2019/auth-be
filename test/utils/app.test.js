require('dotenv').config();
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');




describe('does auth', () => {
    beforeAll(() => {
        return connect();
    });

    beforeEach(done => {
        return mongoose.connection.dropDatabase(() => {
            done();
        });
    });
    afterAll((done) => {
        mongoose.connection.close(done);
    });
    it('can post a sign up', () => {
        return request(app)
            .post('/auth/signup')
            .send({ 
                email: 'email@email.com', password: 'password'
            })
            .then(res => {
                expect(res.body).toEqual({
                    user: {
                        _id: expect.any(String),
                        email: 'email@email.com',
                    },
                    token: expect.any(String)
                });
            });
    });
});
