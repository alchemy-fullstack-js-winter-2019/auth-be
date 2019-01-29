require('dotenv').config();
require('../../lib/utils/connect')();
const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');

// const createUser = (email, password) => {
//   return request(app)
//     .post('/auth/signup')
//     .send({ email, password })
//     .then(res => res.body);
// };

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

  it('can sign up a new user and include token', done => {
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

  it('can sign in a user', () => {
    return User.create({
      email: 'b@b.com',
      password: 'booboo'
    })
      .then(createdUser => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'b@b.com',
            password: 'booboo'
          })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                _id: createdUser._id.toString(),
                email: 'b@b.com'
              },
              token: expect.any(String)
            });
          });
      })
      // eslint-disable-next-line no-console
      .catch(console.log);
  });

  it('can respond with message if bad password', done => {
    return User.create({
      email: 'b@b.com',
      password: 'booboo'
    })
      .then(user => {
        return request(app)
          .post('/auth/signin')
          .send({ email: user.email, password: 'bad' })
          .then(res => {
            expect(res.statusCode).toEqual(401);
            expect(res.body).toEqual({
              error: 'Bad email or password'
            });
            done();
          });
      });
  });

  it('can respond with message if bad email', done => {
    return User.create({
      email: 'b@b.com',
      password: 'booboo'
    })
      .then(user => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'k@k.com', password: user.password })
          .then(res => {
            expect(res.statusCode).toEqual(401);
            expect(res.body).toEqual({
              error: 'Bad email or password'
            });
            done();
          });
      });
  });

});
