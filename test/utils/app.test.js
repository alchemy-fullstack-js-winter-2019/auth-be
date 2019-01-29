require('dotenv').config();
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const User = require('../../lib/models/User');

const createUser = (email) => {
    return request(app)
        .post('/auth/signup')
        .send({ 
            email: email, 
            password: 'password'
        })
        .then(res => res.body);
};

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
                email: 'money@email.com', password: 'password'
            })
            .then(res => {
                expect(res.body).toEqual({
                    user: {
                        _id: expect.any(String),
                        email: 'money@email.com',
                    },
                    token: expect.any(String)
                });
            });
    });
    it('can sign in', () => {
        return createUser('silly@email.com')
            .then(() => {
                return request(app)
                    .post('/auth/signin')
                    .send({ 
                        email: 'silly@email.com', password: 'password'
                    });
            })
            .then(res => {
                expect(res.body).toEqual({
                    user: {
                        _id: expect.any(String),
                        email: 'silly@email.com',
                    },
                    token: expect.any(String)
                });
            });
    });
    it('has a /verify route', () => {
        return User.create({ email: 'test@test.com', password: 'password' })
            .then(() => {
                return request(app)
                    .post('/auth/signin')
                    .send({ 
                        email: 'test@test.com', password: 'password'
                    });
            })
            .then(({ body }) => {
                return request(app)
                    .get('/auth/verify')
                    .set('Authorization', `Bearer ${body.token}`);
            })
            .then(res => {
                expect(res.body).toEqual({ 
                    email: 'test@test.com',
                    _id: expect.any(String)
                });
            });
    });

});
