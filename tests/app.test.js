require('dotenv').config();
const connect = require('../lib/utils/connect');

const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../lib/app');
const User = require('../lib/models/User');

describe('app', () => {
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
      .send({ email: 'abel.j.quintero@gmail.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'abel.j.quintero@gmail.com'
          },
          token: expect.any(String)
        });
      });
  });

  it('can sign in a user', () => {
    return User.create({ 
      email: 'abel.j.quintero@gmail.com', 
      password: 'password' 
    })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ 
            email: 'abel.j.quintero@gmail.com', 
            password: 'password' 
          })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                _id: expect.any(String),
                email: 'abel.j.quintero@gmail.com'
              },
              token: expect.any(String)
            });
          });

      });
  });

  it('can not sign in with a bad email or password', () => {
    return User.create({
      email: 'badEmail@test.com',
      password: 'password'
    })
      .then(() => {
        return request(app)
          .send({
            email: 'badEmail@test.com',
            password: 'password'
          });
      })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });

  it('has a verify route', () => {
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


