require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const User = require('../../lib/models/User');
const { tokenize, untokenize } = require('../../lib/utils/token');

const createUser = (email, password) => {
  return User.create({
    email,
    password
  });
};

describe('User', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });
  afterAll(done => {
    mongoose.connection.close();
    done();
  });

  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({
      _id: expect.any(Types.ObjectId),
      email: 'test@test.com'
    });
  });

  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors).toBeDefined();
    expect(errors.email['message']).toEqual('Email is required.');
  });

  it('can require an email to match a pattern', () => {
    const user = new User({ email: 'test' });
    const errors = user.validateSync().errors;
    expect(errors.email['message']).toEqual(
      '\'test\' is not a valid email!'
    );
  });

  it('stores a _tempPassword', () => {
    const user = new User({ email: 'e@e.com', password: 'abc123' });
    expect(user._tempPassword).toEqual('abc123');
  });

  it('has a passwordHash', () => {
    return createUser('s47@sbc.net', 'cari123')
      .then(user => {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.passwordHash).toBeDefined();
      });
  });

  it('can compare passwords', () => {
    return createUser('spam420@yo.yo', 'hackME')
      .then(user => {
        return user.compare('hackME');
      })
      .then(res => {
        expect(res).toBeTruthy();
      });
  });

  it('can compare bad passwords', () => {
    return createUser('m-3@corp.com', 'boobooboo')
      .then(user => {
        return user.compare('coo');
      })
      .then(res => {
        expect(res).toBeFalsy();
      });
  });

  it('can find a user by token', () => {
    return createUser('t9@t9.com', 'alpha')
      .then(user => tokenize(user))
      .then(token => User.findByToken(token))
      .then(foundUser => {
        expect(foundUser).toEqual({
          _id: expect.any(String),
          email: 't9@t9.com'
        });
      });
  });

  it('can remove __v and passwordHash from user', () => {
    return createUser('security@easy2hack.com', 'beta')
      .then(user => user.toJSON())
      .then(userToJson => {
        expect(userToJson).toEqual({
          _id: expect.any(Types.ObjectId),
          email: 'security@easy2hack.com'
        });
      });
  });

  it('can create an authToken', () => {
    return createUser('breeze@wind-4.air', 'gamma')
      .then(user => user.authToken())
      .then(untokenize)
      .then(user => {
        expect(user).toEqual({
          email: 'breeze@wind-4.air',
          _id: expect.any(String)
        });
      });
  });

});
