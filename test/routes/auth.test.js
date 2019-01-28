require('dotenv').config();
require('../../lib/routes/auth');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const request = require('supertest');


describe('auth test', () => {

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('sign up a new user', () => {
    return request(app)
      .post('/signup')
      .send({ 
        email: 'newUser@test.com',
        password: 'password'
      })
      .then(res => {
        expect(res.body).toEqual({
          email: 'newUser@test.com',
          _id: expect.any(String)
        });
      });
  });

});
