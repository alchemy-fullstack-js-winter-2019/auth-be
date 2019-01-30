require('../../lib/routes/auth');
require('dotenv').config();
const connect = require('../../lib/utils/connect');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');

const createUser = (email) => {
  return request(app)
    .post('/auth/signup')
    .send({ 
      email: email, 
      password: 'password'
    })
    .then(res => res.body);
};

describe('auth route testing', () => {

  beforeAll(() => {
    connect();
  });

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  
  it('can signup a user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ email: 'Aaron@Dennis.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'Aaron@Dennis.com'
          },
          token: expect.any(String)
        });
      });
  });

  it('can sign in', () => {
    return createUser('Aaron@Dennis.com')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ 
            email: 'Aaron@Dennis.com', password: 'password'
          })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                _id: expect.any(String),
                email: 'Aaron@Dennis.com',
              },
              token: expect.any(String)
            });
          });
      });
  });

  it('can not /signin a user with bad password', () => {
    return createUser('Aaron@Dennis.com')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'Aaron@Dennis.com',
            password: 'badPassword'
          });
      })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });

  it('can not /signin a user with bad email', () => {
    return createUser('Aaron@Dennis.com')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'badEmail@test.com',
            password: 'password'
          });
      })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });

  it('can verify a JWT on a user', () => {
    return createUser('Aaron@Dennis.com')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'Aaron@Dennis.com',
            password: 'password'
          })
          .then(res => res.body.token);
      })
      .then(token => {
        return request(app)
          .get('/auth/verify')
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          email: 'Aaron@Dennis.com',
          _id: expect.any(String)
        });
      });
  });
});
