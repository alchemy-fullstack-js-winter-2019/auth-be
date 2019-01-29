require('dotenv').config();
require('../lib/utils/connect')();

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../lib/app');

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
  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can signup a new user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ email: 'abc@abc.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'abc@abc.com',
          },
          token: expect.any(String)
        });
      });
  });
  it('can sign in a user', () => {
    return createUser('test@test.com')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'test@test.com', password: 'password' })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                email: 'test@test.com',
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
});

