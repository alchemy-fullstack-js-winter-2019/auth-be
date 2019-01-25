require('dotenv').config();
require('../../lib/utils/connect')();

const mongoose = require('mongoose');
const { Types } = require('mongoose');
const User = require('../../lib/models/User');
const { tokenize } = require('../../lib/utils/token');


describe('User tests', () => {

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ 
      email: 'test@test.com',
      _id: expect.any(Types.ObjectId)
    });
  });

  it('has a required email', () => {
    const user = new User({ });
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Email required');
  });

  it('stores a _tempPassword', () => {
    const email = 'test@test.com';
    const password = 'password';
    const user = new User({ email, password });
    expect(user._tempPassword).toEqual('password');
  });

  it('passwordHash is set', () => {
    return User.create({ 
      email: 'test@test.com', 
      password: 'passwordTest' 
    })
      .then(user => {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.password).toBeUndefined();
      });
  });

  it('compares passwords', () => { 
    const password = 'password';
    return User.create({ email: 'test@test.com', password })
      .then(user => {
        return user.compare(password);
      })
      .then(res => {
        expect(res).toBeTruthy();
      });
  });

  it('can compare bad passwords', () => {
    const password = 'password';
    return User.create({ email: 'test@test.com', password })
      .then(user => {
        return user.compare('badpassword');
      })
      .then(res => {
        expect(res).toBeFalsy();
      });
  });

  it('can untokenize a user', () => {
    // Create a new user if one doesn't exist
    return User.create({ 
      email: 'test@test.com', 
      password: 'passwordTest' 
    })
    // Make the user into a token
      .then(user => {
        return tokenize(user);
      })
      // Find the token and untokenize it to find user
      .then(userToken => {
        return User.findByToken(userToken);
      })
      // Expect the user object back including the id and version
      .then(userFromToken => {
        expect(userFromToken).toEqual({
          email: 'test@test.com',
          _id: expect.any(String),
        });
      });
  });

  it('does not return __v or passwordHash with user', () => {
    return User.create({
      email: 'test@test.com', 
      password: 'passwordTest'
    })
      .then(user => {
        return tokenize(user);
      })
      .then(userToken => {
        return User.findByToken(userToken);
      })
      .then(userFromToken => {
        expect(userFromToken.passwordHash).toBeUndefined();
        expect(userFromToken.__v).toBeUndefined();
      });
  });

});
