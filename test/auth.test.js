require('dotenv').config();
require('../lib/utils/connect')();

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../lib/app');
const User = require('../lib/models/User');


const createUser = email => {
  return request(app)
    .post('/auth/signup')
    .send({ 
      email,
      password: 'password'
    })
    .then(res =>  res.body);
};

describe('auth', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('can signup a new user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ email: 'teonna@heintz.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'teonna@heintz.com',
          },
          token: expect.any(String)
        });
      });
  });

  it('can sign in a user', () => {
    return createUser('teonna@heintz.com')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'teonna@heintz.com', password: 'password' })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                email: 'teonna@heintz.com',
                _id: expect.any(String),
              },
              token: expect.any(String)
            });
          });

      });
  });

  it('cannot signin a user with a bad passwrod', () => {
    return createUser('test@test.com')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'test@test.com', password: 'badpassword' })
          .then(res => {
            expect(res.status).toEqual(401);
          });

      });
  });

  it('has as /verify route', () => {
    return User.create({ email: 'teonna@heintz.com', password: 'Robert34980' })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'teonna@heintz.com', password: 'Robert34980' })
          .then(res => res.body.token);  
      })
      .then(token => {
        return request(app)
          .get('/auth/verify')
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          email: 'teonna@heintz.com', 
          _id: expect.any(String)
        });
      });
  });
});

afterAll(done => {
  mongoose.connection.close(done);
});
