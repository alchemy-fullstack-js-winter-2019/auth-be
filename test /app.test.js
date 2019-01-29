require('dotenv').config();
const connect = require('../lib/utils/connect');
const user = require('../lib/models/User');
const request = require('supertest');
const mongoose = require('moongoose');

const app = require('../lib/app');


describe('app', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('can signup a user', () => {
    return request(app)
      .post('auth/signup')
      .send({
        email: 'test@test.com',
        password:'password'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id:expect.any(String),
            email:'test@test.com'
          },
          token: expect.any(String)
        });
      });
  });
  it('can signin a user', () => {
    
    user.create({
      email:'test@test.com',
      password:'password'

    });
    return request(app)
      .post('auth/signin')
      .send({
        email: 'test@test.com',
        password:'password'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id:expect.any(String),
            email:'test@test.com'
          },
          token: expect.any(String)
        });
      });
  });
});
