require('dotenv').config();
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

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
});
