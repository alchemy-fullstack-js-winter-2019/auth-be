require('dotenv').config();
const connect = require('../lib/utils/connect');
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const User = require('../lib/models/User');


describe('auth', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });
  it('landing page to signup for services', () => {
    return request(app)
      .post('/auth/signup')
      .send({
        email: 'bob@yahoo.com',
        password: 'pass45'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'bob@yahoo.com'
          },
          token: expect.any(String)
        });
      });
  });

  it('signin a user', () => {
    return User.create({ email: 'bob@yahoo.com', password: 'qwert' }) //creating a user is a promise
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ 
            email: 'bob@yahoo.com',
            password: 'qwert'
          });
      })
      .then (res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'bob@yahoo.com'
          },
          token: expect.any(String)
        });
      });
  });
  it('has a /verify route', () => { 
    return User.create({ email: 'bob@yahoo.com', password: 'wert' })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'bob@yahoo.com', password: 'wert' })
          .then(res => res.body.token);
      })
      .then(token => {
        return request(app)
          .get('/auth/verify')
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => { //we expect to recieve back
        expect(res.body).toEqual({
          email: 'bob@yahoo.com',
          _id: expect.any(String)
        });
      });
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

});
