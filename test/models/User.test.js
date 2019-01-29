require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const User = require('../../lib/models/User');
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('User model', () => {
  beforeEach(done => mongoose.connection.dropDatabase(done));

  afterAll(() => mongoose.disconnect());

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
    const user = new User({
      email: 'test@test.com',
      password: 'passtotheword'
    });
    expect(user._tempPassword).toEqual('passtotheword');
  });

  it('has a passwordHash', () => {
    return User.create({
      email: 'test@test.com',
      password: 'passit'
    })
      .then(user =>  {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.password).toBeUndefined();
      });
  });

  it('can compare good passwords', () => {
    return User.create({
      email: 'test@test.com',
      password: 'passit'
    })
      .then(user => user.compare('passit'))
      .then(res => expect(res).toBeTruthy());
  });

  it('can compare bad passwords', () => {
    return User.create({
      email: 'test@test.com',
      password: 'passit'
    })
      .then(user => user.compare('dontpassit'))
      .then(res => expect(res).toBeFalsy);
  });

  it('can find a user by token', () => {
    return User.create({
      email: 'test@test.com',
      password: 'passit'
    })
      .then(user => user.findByToken(tokenize({
        email: user.email,
        password: user.password,
        _id: user._id.toString()
      })))
      .then(userFromToken => {
        expect(userFromToken).toEqual({
          email: 'test@test.com',
          _id: expect.any(String)
        });
      });
  });

  it('can create an auth token', () => {
    return User.create({
      email: 'test@test.com',
      password: 'passit'
    })
      .then(user => user.authToken())
      .then(untokenize)
      .then(user => {
        expect(user).toEqual({
          email: 'test@test.com',
          _id: expect.any(String)
        });
      });
  });
});
