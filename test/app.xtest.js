require('dotenv').config();
require('../lib/utils/connect')();
const app = require('../lib/app');
const mongoose = require('mongoose');
const User = require('../lib/models/User');
const request = require('supertest');
const connect = require('../lib/utils/connect');



describe('userAuth', ()=> {
  const createUser = (email = 'johnny', password = 'password') => {
    return User.create({
      email, password
    });
  };
  beforeAll(() => {
    connect();
  });

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it.only('can sign up a user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ email: 'johnny@email.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          user:{
            _id: expect.any(String),
            email: 'johnny@email.com'
          },
          token: expect.any(String)
        });
      });
  });

  it('checks for sign in', ()=> {
    return createUser('johnny')
      .then(createdUser => {
        return request(app)
          .post('auth/signin')
          .send(createdUser.email);
      })
      .then(res => {
        expect(res.body).toEqual({
          user:{
            email: '',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });

  });


});




