require('dotenv').config();
const connect = require('../lib/utils/connect');
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
// const auth = require('../lib/routes/auth');
const User = require('../lib/models/User');


describe('', () => {
  // const createUser = (email, password) => {
  //   return request (app)
  //     .post('/auth/')
  // }

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

  it('signin a user', () => {
    return User.create({ email: 'bob@yahoo.com', password: 'qwert' }) //this is a promise. created a user
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ 
            email: 'bob@yahoo.com',
            password: 'qwert'
          });
      })
      .then (res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'bob@yahoo.com'
          },
          token: expect.any(String)
        });
      });
  });
  it('has a /verify route', () => { 
    //create a user
    return User.create({ email: 'bob@yahoo.com', password: 'wert' })
    //log user in to get a token
      .then(() => {
        //login user to get a token
        return request(app)
          .post('/auth/signin')
          .send({ email: 'bob@yahoo.com', password: 'wert' })
          .then(res => res.body.token);
      })
      .then(token => {
        //request /verify and present token
        //use .set(Authorization',`Bear ${token})
        return request(app)
          .get('/auth/verify')
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => {
        //expect res.body to be a user
        expect(res.body).toEqual({
          email: 'bob@yahoo.com',
          _id: expect.any(String)
        });
      });

  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

});
