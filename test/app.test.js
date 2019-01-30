require('dotenv').config();
require('../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

const createUser = (email) => {
  return request(app)
    .post('/auth/signup')
    .send({
      email: email,
      password: 'roxy1'
    })
    .then(res => res.body);
};

describe('auth routes', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('signs up user', () => {
    return request(app) 
      .post('/auth/signup')
      .send({
        email: 'kristinhortsch@gmail.com',
        password: 'roxy1'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            email: 'kristinhortsch@gmail.com',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });

  it('can sign in', () => {
    return createUser('kristinhortsch@gmail.com')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'kristinhortsch@gmail.com',
            password: 'roxy1'
          })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                email: 'kristinhortsch@gmail.com',
                _id: expect.any(String)
              },
              token: expect.any(String)
            });
          });
      });
  });

  it('can fail with a bad password', () => {
    return createUser('kristinhortsch@gmail.com')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'kristinhortsch@gmail.com',
            password: 'roxy2'
          })
          .then(res => {
            expect(res.status).toEqual(401);
          });
      });
  });

  it('can fail with a bad email', () => {
    return createUser('kristinhortsch@gmail.com')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'bademail@gmail.com',
            password: 'roxy1'
          })
          .then(res => {
            expect(res.status).toEqual(500);
          });
      });
  });

  it('has a /verify route', () => {
    return User.create({ email: 'baller@gmail.com', password: 'abc' })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'baller@gmail.com', 
            password: 'abc'
          });
      })
      .then(res => {
        return request(app)
          .get('/auth/verify')
          .set('Authorization', `Bearer ${res.body.token}`);
      })
      .then(res => {
        expect(res.body).toEqual({ email: 'baller@gmail.com', _id: expect.any(String) });
      });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });
});


