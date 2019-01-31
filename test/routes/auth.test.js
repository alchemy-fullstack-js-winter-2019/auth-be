require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const User = require('../../lib/models/User');

const createUser = (email = 'test@gmail.com') => {
    return User.create({ email, password: 'yes' });
};


describe('test user routes', () => {
    beforeEach(done => {
        return mongoose.connection.dropDatabase(() => {
            done();
        });
    });
    afterAll((done) => {
        mongoose.connection.close(done);
    });

    it('a user can sign up', () => {
        return request(app)
            .post('/auth/signup')
            .send({
                email: 'LOL@gmail.com',
                password: 'LANCE'
            })
            .then(res => {
                expect(res.text).toContain('LOL@gmail.com');
            });
    });


    it('a user can sign in', () => {
        return createUser('lance@gmail.com')
            .then(() => {
                return request(app)
                    .post('/auth/signin')
                    .send({
                        email: 'lance@gmail.com',
                        password: 'yes'
                    })
                    .then(res => {
                        expect(res.text).toContain('lance@gmail.com');
                    });
            });
    });
    it('can verify a user', () => {
        return createUser('lance@gmail.com')
            .then(() => {
                return request (app)
                    .post('/auth/signin')
                    .send({
                        email: 'lance@gmail.com',
                        password: 'yes'
                    });
            })
            .then(({ body }) => {
                return request(app)
                    .get('/auth/verify')
                    .set('Authorization', `Bearer ${body.token}`);
            })
            .then(res => {
                expect(res.body).toEqual({ _id: expect.any(String), email: 'lance@gmail.com' });
            });
    });
});