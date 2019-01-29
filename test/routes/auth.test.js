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
            .then(createdUser => {
                console.log(createdUser);
                return request(app)
                    .post('/auth/signin')
                    .send({
                        email: 'lance@gmail.com',
                        password: 'yes'
                    })
                    .then(res => {
                        console.log(res.body);
                        expect(res.text).toContain('lance@gmail.com');
                    });
            });
    });
});