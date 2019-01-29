require('dotenv').config();
const connect = require('../lib/utils/connect');

const request = require ('supertest');
const mongoose = require ('mongoose');
const Tweet = require('../lib/models/Tweet');
const User = require('../lib/models/User');

describe('app', () => {

  const createUser = (handle, name, email) => {
    return User.create({ handle, name, email })
      .then(user => ({ ...user, _id: user._id.toString() }));
  };

  const createTweet = ((handle, text = 'my first tweet') => {
    return createUser(handle, 'abel', 'abel.j.quintero@gmail.com')
      .then(user => {
        return Tweet.create({ handle: user._id, text })
          .then(tweet => ({ ...tweet, _id: tweet._id.toString() }));
      });
  });

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it.only('can sign up a user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ email: 'banana@test.com', password: 'password' })
      .
  });
});