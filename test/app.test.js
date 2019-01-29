require('dotenv').config();
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('app', () => {
  beforeAll(() => connect());

  beforeEach(done => mongoose.connection.dropDatabase(done));

  afterAll(done => mongoose.connection.close(done));

  it('signs up', () => {
    return request(app)
      .post('/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'passit'
      })
      .then(res => expect(res.body).toEqual({
        user: {
          _id: expect.any(String),
          email: 'test@test.com'
        },
        token: expect.any(String)
      }));
  });

  it('signs in', () => {
    return User
      .create({ email: 'test@test.com', password: 'passit' })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'test@test.com', password: 'passit' })
          .then(res => expect(res.body).toEqual({
            user: {
              _id: expect.any(String),
              email: 'test@test.com'
            },
            token: expect.any(String)
          }));
      });
  });

  it('returns error on bad signin', () => {
    return User
      .create({ email: 'test@test.com', password: 'passit' })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'est@test.com', password: 'dontpassit' })
          .then(res => {
            expect(res.status).toEqual(401);
            expect(res.body.error).toEqual('Bad email or password');
          });
      });
  });

  it('verifies token', () => {
    return User
      .create({ email: 'test@test.com', password: 'passit' })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'test@test.com', password: 'passit' })
          .then(() => {
            return request(app)
              .get('/auth/verify')
              .set('Authorization', 'blah')
              .then(auth => expect(auth.body).toEqual({ token: expect.any(String) }));
          });
      });
  });
});
