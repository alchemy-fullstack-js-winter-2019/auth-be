require('dotenv').config();
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = require('supertest');

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
  
  
  it.only('will create a sign up', () => {
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
});

