require('dotenv').config();
require('../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

const createUser = (email) => {
  return request(app)
    .post('/auth/signup')
    .send({
      email: email,
      password: 'roxy1'
    })
    .then(res => res.body);
};

describe('auth routes', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('signs up user', () => {
    return request(app) 
      .post('/auth/signup')
      .send({
        email: 'kristinhortsch@gmail.com',
        password: 'roxy1'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            email: 'kristinhortsch@gmail.com',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });

  it('can sign in', () => {
    return createUser('kristinhortsch@gmail.com')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'kristinhortsch@gmail.com',
            password: 'roxy1'
          })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                email: 'kristinhortsch@gmail.com',
                _id: expect.any(String)
              },
              token: expect.any(String)
            });
          });
      });
  });



  afterAll((done) => {
    mongoose.disconnect(done);
  });
});


// describe('auth routes', () => {
//   it('can signup a new user', () => {
//     return request(app)
//       .post('/auth/signup')
//       .send({
//         email: 'kristinhortsch@gmail.com',
//         password: 'roxy1'
//       })
//       .then(res => {
//         expect(res.body).toEqual({
//           user: {
//             email: 'kristinhortsch@gmail.com',
//             _id: expect.any(String)
//           },
//           token: expect.any(String)
//         });
//       });
//   });


