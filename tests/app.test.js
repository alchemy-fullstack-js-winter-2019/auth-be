require('dotenv').config();
const connect = require('../lib/utils/connect');

const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../lib/app');

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
});

