require('dotenv').config();
require('../../lib/utils/connect')();
// const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
// const {
//   tokenize,
//   untokenize
// } = require('../../lib/utils/token');


describe('auth route', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });
  afterAll(done => {
    mongoose.connection.close();
    done();
  });
  it('can create an authToken', done => {
    const user = {
      email: 'test@test.com',
      password: 'password'
    };
    return request(app)
      .post('/auth/signup')
      .send(user)
      .then(res => {
        expect(res.body).toEqual({
          user: {
            email: 'test@test.com',
            _id: expect.any(String)
          },
          token: expect.any(String),
        });
        done();
      });
  });
});
