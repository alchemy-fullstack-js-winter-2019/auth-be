require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');
const User = require('../../lib/models/User');
const app = require('../../lib/app');
const mongoose = require('mongoose');

describe.only('auth', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('can signup a new user', done => {
    return request(app)
      .post('/auth/signup')
      .send({ email: 'banana@test.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            email: 'banana@test.com',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
        done();
      });
  });

  it('can signin a user', () => {
    return User.create({ email: 'what@huh.com', password: 'pass' })
      .then(user => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'what@huh.com', password: 'pass' })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                email: 'what@huh.com',
                _id: user._id.toString()
              },
              token: expect.any(String)
            });
          });
      });
  });

  it('can throw an error if a bad signin', () => {
    return User.create({ email: 'banana@huh.com', password: 'pass' })
      .then(user => {
        return request(app)
          .post('/auth/signin')
          .send({ email: user.email, password: 'p3ss' })
          .then(res => {
            expect(res.status).toEqual(401);
          });
      });
  });

  it('cannot sign in a user with a bad email', () => {
    return User.create({ email: 'banana@huh.com', password: 'pass' })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'bademail@huh.com', password: 'p3ss' })
          .then(res => {
            expect(res.status).toEqual(401);
          });
      });
  });

  
  afterAll((done) => {
    mongoose.disconnect(done);
  }); 
});

