require('dotenv').config();
require('../../lib/utils/connect')();
const { Types } = require('mongoose');
const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const { tokenize } = require('../../lib/utils/token');


describe('user model tests', () => {
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
    const user = new User({ email: 'test@test.com', password: 'abc' });
    expect(user._tempPassword).toEqual('abc');
  });
  it('password hash is set after user.save', () => {
    const user = new User({ email: 'test@test.com', password: 'abc' });
    user.save()
      .then(user => {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.password).toBeUndefined();
      });
  });
  it('can compare passwords', () => {
    return User.create({
      email:'test@test.com',
      password: 'password'
    })
      .then(user =>{
        return user.compare('password');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });
  it('can find a user by token', () => {
    return User.create({
      email:'test@test.com',
      password: 'password'
    })
      .then(user => tokenize(user))
      .then(token => User.findByToken(token))
      .then(userFromToken => {
        expect(userFromToken).toEqual({
          email: 'test@test.com',
          _id: expect.any(String)
        });
      });
  });
});
