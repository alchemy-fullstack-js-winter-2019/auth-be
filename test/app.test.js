require('dotenv').config();
// require('../lib/utils/connect')();
const app = require('../lib/app');
const mongoose = require('mongoose');
const User = require('../lib/models/User');
const request = require('supertest');
const connect = require('../lib/utils/connect');


describe('userAuth', ()=> {
  beforeAll(() => {
    connect();
  });

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can sign up a user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ email: 'johnny@email.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          user:{
            _id: expect.any(String),
            email: 'johnny@email.com'
          },
          token: expect.any(String)
        });
      });
  });

  it('signs a user in', ()=> {
    return User.create({
      email: 'johnny@email.com',
      password: 'password'
    })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'johnny@email.com',
            password: 'password'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user:{
            email: 'johnny@email.com',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });

  });
  it('denies access with bad pw', ()=> {
    return User.create({
      email: 'johnny@email.com',
      password: 'password'
    })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'johnny@email.com',
            password: 'pass'
          });
      })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });
  it('denies access with bad email', ()=> {
    return User.create({
      email: 'johnny@email.com',
      password: 'password'
    })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'johnny@.com',
            password: 'password'
          });
      })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });

  it('has a /verify route', () => {
    return User.create({
      email: 'mine@email.com',
      password: 'password'
    })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'mine@email.com', password: 'password' })
          .then(res =>  res.body.token);
      })
      .then(token => {
        return request(app)
          .get('/auth/verify')
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          email: 'mine@email.com',
          _id: expect.any(String)
        });
      });
  });
});
