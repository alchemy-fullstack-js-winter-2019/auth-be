require('dotenv').config();
require('../../lib/utils/connect')();
const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('User model', () => {
  const testUser = (email, password) => {
    return User.create({
      email,
      password
    });
  };
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(Types.ObjectId) });
  });

  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Email required');
  });

  it('stores a _tempPassword', () => {
    return testUser('test@email.com', 'pass')
      .then(user => {
        expect(user._tempPassword).toEqual('pass');
      });
  });

  it('has a passwordHash', () => {
    return testUser('test@email.com', 'pass')
      .then(user => {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.password).toBeUndefined();
      });
  });
  it('can compare passwords', () => {
    return testUser('test@email.com', 'pass')
      .then(user => {
        return user.compare('pass');
      })
      .then(result => {
        console.log(result);
        expect(result).toBeTruthy;
      });
  });
  it('can find a user by token', () =>{
    return testUser('test@email.com', 'pass')
      .then(user => tokenize(user))
      .then(token => User.findByToken(token))
      .then(userFromToken => {
        expect(userFromToken).toEqual({
          email: 'test@email.com',
          _id: expect.any(String)
        });
      });
  });
  it('can create an auth token', ()=> {
    return testUser('test@email.com', 'pass')
      .then(user => user.authToken())
      .then(untokenize)
      .then(user => {
        expect(user).toEqual({
          email: 'test@email.com',
          _id: expect.any(String)
        });
      });

  });
});

