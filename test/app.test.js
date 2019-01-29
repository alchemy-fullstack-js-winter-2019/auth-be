require('dotenv').config();
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
const mongoose = require('mongoose');
const request = require('supertest');
const User = require('../lib/models/User');

describe('signup', ()=> {
  const createUser = (email, password) => {
    return User.create({ email, password })
      .then(createdUser => ({ ...createdUser, _id: createdUser._id.toString() }));
  };

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

  it('will find a user by email', () => {
    return createUser('ivan2@espn.com', 'abc123')
      .then(createdUser => {
        return Promise.all([
          Promise.resolve(createdUser._id), 
          request(app)
        ])
          .post('/auth/signin')
          .send({ 
            email: 'ivan@espn.com', 
            password: 'abc123' 
          })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                email: 'ivan@espn.com',
    
              }
            });
          });
      });
  });
});

