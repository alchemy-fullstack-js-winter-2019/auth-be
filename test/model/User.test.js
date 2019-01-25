require('dotenv').config();
require('../../lib/utils/connect')();
const User = require('../../lib/models/User');
const { Types } = require('mongoose');
const mongoose = require('mongoose');
const { tokenize } = require('../../lib/utils/token');

describe('User Model', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ _id: expect.any(Types.ObjectId), email: 'test@test.com' });
  });

  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    const message = errors.email.message;
    expect(message).toEqual('Email is required.');
  });

  it('returns an error if badEmail', () => {
    const user = new User({ email: 'hi' });
    const errors = user.validateSync().errors;
    const message = errors.email.message;
    expect(message).toEqual(`${user.email} is not a valid email!`);
  });

  it('stores a _tempPassword', () => {
    const user = new User({ 
      email: 'test@gmail.com', 
      password: 'p455w07d' 
    });
    expect(user._tempPassword).toEqual('p455w07d');
  });

  it('it sets a passwordHash', () => {
    return User.create({
      email: 'test@test.com',
      password: 'yoyo'
    }).then(user => {
      expect(user.passwordHash).toEqual(expect.any(String));
      expect(user.password).toBeUndefined();
    });
  });

  it('compares password with hashedPassword', () => {
    return User.create({
      email: 'test@test.com',
      password: 'password'
    }).then(user => {
      return user.compare('password');
    }).then(res => {
      expect(res).toBeTruthy();
    });
  });

  it('compares BAD password with hashedPassword', () => {
    return User.create({
      email: 'test@test.com',
      password: 'password'
    })
      .then(user => {
        return user.compare('p3ssword');
      })
      .then(res => {
        expect(res).toBeFalsy();
      });
  });

  it('gets a user by its token', () => {
    return User.create({
      email: 'test@test.com',
      password: 'password'
    })
      .then(user => {
        return tokenize(user);
      })
      .then(token => {
        return User.findByToken(token);
      })
      .then(foundUser => {
        expect(foundUser).toEqual({ 
          email: 'test@test.com',
          passwordHash: expect.any(String),
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  }); 
});


