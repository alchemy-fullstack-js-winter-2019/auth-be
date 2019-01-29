require('dotenv').config();
require('../../lib/utils/connect')();

const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../lib/app');

describe('auth test', () => {

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('sign up a new user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ 
        email: 'newUser@test.com',
        password: 'password'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            email: 'newUser@test.com',
            _id: expect.any(String)
          },
          token: expect.any(String),
        });
      });
  });

});
