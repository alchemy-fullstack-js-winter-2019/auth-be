require('dotenv').config();
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

const createUser = (email) => {
  return request(app)
    .post('/auth/signup')
    .send({ 
      email: email, 
      password: 'password'
    })
    .then(res => res.body);
};

describe('app', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can /signup a user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'test@test.com'
          },
          token: expect.any(String)
        });
      });
  });
  it('can sign in', ( => {
    return createUser('jei@mail.com')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ 
            email: 'jei@email.com', password: 'password'
        })
        .then(res => {
            expect(res.body).toEqual({
                user: {
                    _id: expect.any(String),
                    email: 'jei@email.com',
                },
                token: expect.any(String)
            });
        });
      });
  });

});


