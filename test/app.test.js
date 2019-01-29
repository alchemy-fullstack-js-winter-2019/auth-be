require('dotenv').config();
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = require('supertest');
const User = require('../lib/models/User');

describe('signup', ()=> {

  beforeAll(() => {
    connect();
  });

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });
  afterAll((done) => {
    mongoose.connection.close(done);
  });
  
  
  it('will create a sign up', () => {
    return request(app)
      .post('/auth/signup')
      .send({
        email: 'ivan@espn.com',
        password: 'abc123'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            email: 'ivan@espn.com',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });

  it('can let user signin', () => {
    return User.create({
      email: 'ivan@espn.com',
      password: 'abc123'
    })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'ivan@espn.com',
            password: 'abc123'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            email: 'ivan@espn.com',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });

  it('can not /signin a user with bad password', () => {
    return User.create({
      email: 'ivan1@espn.com',
      password: 'abc123'
    })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'ivan1@espn.com',
            password: 'abc1234'
          });
      })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });

  it('can not /signin a user with bad email', () => {
    return User.create({
      email: 'ivan@espn.com',
      password: 'abc123'
    })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'navi@espn.com',
            password: 'abc123'
          });
      })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });
});
