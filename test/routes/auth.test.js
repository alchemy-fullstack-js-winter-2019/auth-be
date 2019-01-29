require('dotenv').config();
require('../../lib/utils/connect')();
const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');

const createUser = (
  email = 'default@email.com',
  password = 'defaultPassword'
) => {
  return User.create({
    email,
    password
  })
    .then(res => res.body);
};

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

  it('can sign up a new user and include token', () => {
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
      });
  });

  it('can sign in a user', () => {
    return User.create({
      email: 'cari.pizza@pizza.io',
      password: 'tomatoSlice'
    })
      .then(createdUser => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'cari.pizza@pizza.io',
            password: 'tomatoSlice'
          })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                _id: createdUser._id.toString(),
                email: 'cari.pizza@pizza.io'
              },
              token: expect.any(String)
            });
          });
      })
      // eslint-disable-next-line no-console
      .catch(console.log);
  });

  it('can respond with message if bad password', () => {
    return createUser('xyz.AMAZING@outlook.net', 'ReallySecure')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'xyz.AMAZING@outlook.net', password: 'bad' })
          .then(res => {
            expect(res.statusCode).toEqual(401);
            expect(res.body).toEqual({
              error: 'Bad email or password'
            });
          });
      });
  });

  it('can respond with message if bad email', () => {
    return createUser('z.z@zz-top.biz', 'FBIvan#8')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({ email: 'k@k.com', password: 'FBIvan#8' })
          .then(res => {
            expect(res.statusCode).toEqual(401);
            expect(res.body).toEqual({
              error: 'Bad email or password'
            });
          });
      });
  });

  it('has a /verify route', () => {
    return createUser('b@b.com', 'booboo')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            email: 'b@b.com',
            password: 'booboo'
          })
          .then(res => res.body.token);
      })
      .then(token => {
        return request(app)
          .get('/auth/verify')
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'b@b.com'
        });
      });
  });

});
