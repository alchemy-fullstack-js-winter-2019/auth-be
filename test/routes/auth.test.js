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

  it('cannot sign in an existing user with bad password', () => {
    return createUser({ password: 'password' })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'schnepherd@gmail.com', password: 'badpassword' })
          .then(res => {
            expect(res.status).toEqual(401);
          });
      });
  });

  it('cannot sign in if user not found', () => {
    return createUser({ password: 'password' })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'notfound@gmail.com', password: 'badpassword' })
          .then(res => {
            expect(res.status).toEqual(401);
          });
      });
  });

  it('has a /verify route', () => {
    User.create({ email: 'test@test.com', password: 'password' })
      .then(user => {
        return request(app)
          .post('/auth/signup')
          .send({ user });
      })
      .then(token => {
        return request(app)
          .get('/auth/verify')
          .send(token)
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => {
        expect(res.body).toEqual({ 
          email: 'test@test.com', 
          password: 'password' });
      });
  });

});
