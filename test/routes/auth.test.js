require('dotenv').config();
require('../../lib/utils/connect')();

const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../lib/app');
const User = require('../../lib/models/User');



describe('auth test', () => {

  const createUser = ({ email = 'schnepherd@gmail.com', password }) => {
    return User.create({ email, password });
  };

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
          token: expect.any(String)
        });
      });
  });

  it('sign in an existing user', () => {
    return createUser({ password: 'password' })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'schnepherd@gmail.com', password: 'password' })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                email: 'schnepherd@gmail.com',
                _id: expect.any(String),
              },
              token: expect.any(String)
            });
          });
      });
  });

});
