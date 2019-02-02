require('dotenv').config();
const connect = require('../lib/utils/connect');

const User = require('../lib/models/User');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../lib/app');

describe.skip('user tests', () => {
  beforeAll(() => {
    connect();
  });
    
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });
    
  afterAll(done => {
    mongoose.connection.close(done);
  });
    
  it('signs up a new user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ email: 'tyler@gmail.com', password: 'abc123' })
      .then(res => {
        expect(res.body).toEqual({
          user:{
            email: 'tyler@gmail.com',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });
  it('can /signin a user', () => {
    return User.create({
      email: 'test@test.com',
      password: 'password'
    })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'test@test.com',
            password: 'password'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            email: 'test@test.com',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });
  it('has a /verify route', () => {
    return User.create({ email: 'test@test.com', password: 'password' })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'test@test.com', password: 'password' })
          .then(res => res.body.token);
      })
      .then(token => {
        return request(app)
          .get('/auth/verify')
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          email: 'test@test.com',
          _id: expect.any(String)
        });
      });
  });
});


