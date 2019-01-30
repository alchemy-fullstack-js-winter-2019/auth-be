const User = require('../../lib/models/User');
const mongoose = require('mongoose');
require('dotenv').config();
require('../../lib/utils/connect')();
const { tokenize } = require('../../lib/utils/token');

describe('user model', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('validates a good model', () => {
    const user = new User({
      email: 'test@test.com'
    });
    expect(user.toJSON()).toEqual({ 
      email: 'test@test.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors).toBeTruthy();
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

  it('must be a valid email address entered', () => {
    const user = new User({
      email: 'invalidemail'
    });
    const errors = user.validateSync().errors;
    expect(errors).toBeTruthy();
    expect(errors.email.message).toEqual('email is invalid');
  });

  it('stores a _tempPassword', () => {
    const user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    expect(user._tempPassword).toEqual('password');
  });

  it('has a passwordHash', () => {
    const user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save()
      .then(user => {
        expect(user.passwordHash).toBeDefined();
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.password).toBeUndefined();
      });
  });

  it('returns true when clear text password matches the password hash', () => {
    const password = 'password';
    return User.create({ email: 'test@test.com', password })
      .then(user => {
        return user.compare(password);
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('returns false when clear text password matches the password hash', () => {
    const password = 'password';
    return User.create({ email: 'test@test.com', password })
      .then(user => {
        return user.compare('badpassword');
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });

  it('can return a user with findByToken', () => {
    return User.create({ email: 'test@test.com', password: 'password' })
      .then(user => {
        const token = tokenize(user);
        return User.findByToken(token);
      })
      .then(foundUser => {
        expect(foundUser.email).toEqual('test@test.com');
      });
  });

  it('can transform the json to remove the v and password hash', () => {
    return User.create({ email: 'test@test.com', password: 'password' })
      .then(user => {
        expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(Object) });
      });
  });

  it('can create an instance method and return a token for a user', () => {
    return User.create({ email: 'test@test.com', password: 'test' })
      .then(user => {
        return user.authToken();
      })
      .then(token => {
        expect(token).toEqual(expect.any(String));
      });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
