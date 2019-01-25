require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const User = require('../../lib/models/User');
const { tokenize } = require('../../lib/utils/token');

describe('User model', () => {

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it.only('validates a good model', () => {
    const user = new user({ email: 'test@test.com' });
    expect(user.JSON).toEqual({ email: 'test@test.com', _id: expect.any(Object) });
  });

  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync();
    expect(errors.email.message).toEqual('');
  });

  it('stores an _tempPassword', () => {
    const user = new User({ email: 'test@test.com', password: 'PassWord' });
    expect(user._tempPassword).toEqual('PassWord');
  });

  it('has a passwordHash', () => {
    return User.create({
      email: 'test@test.com',
      password: 'PassWord'
    })
      .then(user => {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.password).toBeUndefined();
      });
  });

  it('can compare good passwords', () => {
    return User.create({
      email: 'test@test.com',
      password: 'PassWord'
    })
      .then(user => {
        user.compare('PassWord');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('can compare bad passwords', () => {
    return User.create({
      email: 'test@test.com',
      password: 'PassWord'
    })
      .then(user => {
        user.compare('badPassWord');
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });

  it('can find a user by token', () => {
    return User.create({
      email: 'test@test.com',
      password: 'PassWord'
    })
      .then(user => tokenize(user))
      .then(token => User.findByToken(token))
      .then(userFromToken => {
        expect(userFromToken).toEqual({
          email: 'test@test.com',
          _id: expect.any(String),
        });
      });
  });

  it('can create an auth token', () => {
    return User.create({
      email: 'test@test.com',
      password: 'password'
    })
    
    })
  });
});