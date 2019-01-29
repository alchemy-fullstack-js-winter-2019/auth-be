require('dotenv').config();
const connect = require('../lib/utils/connect');
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
// const auth = require('../lib/routes/auth');


describe('', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });


  it('landing page to signup for services', () => {
    // return createUser({ email: 'bob@yahoo.com', passowrd: 'pass45'})
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

  // it('', () => {

  // });
  afterAll(done => {
    mongoose.connection.close(done);
  });

});

