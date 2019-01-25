require('dotenv').config();
require('../../lib/utils/connect')();
const User = require('../../lib/models/User');
const mongoose = require('mongoose');
const { tokenize } = require('../../lib/utils/token');

describe('User model test', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(done);
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('validates a good model', () => { 
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ _id: expect.any(Object), email: 'test@test.com' });
  });

  it('has a required email', () => { 
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

  it('stores a _tempPassword', () => {
    const user = new User({ email: 'test@test.com', password: 'NO' });
    expect(user._tempPassword).toEqual('NO');
  });

  it('hashes a plaintext password', () => {
    const user = new User({ email: 'test@test.com', password: 'NO' });
    user.save()
      .then(user => {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.password).toBeUndefined();
      });
  });

  it('can compare good passwords', () => {
    const user = new User({ email: 'test@test.com', password: 'NO' });
    return user.save()
      .then(user => {
        return user.compare('NO');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('can compare bad passwords', () => {
    const user = new User({ email: 'test@test.com', password: 'NO' });
    return user.save()
      .then(user => {
        return user.compare('badPassword');
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });

  it('can find a user by token and removes version and password hash', () => {
    const user = new User({ email: 'test@test.com', password: 'NO' });
    return user.save()
      .then(user => {
        return tokenize(user);
      })
      .then(token => {
        return User.findByToken(token);
      })
      .then(user => {
        expect(user).toEqual({
          email: 'test@test.com',
          _id: expect.any(String)
        });
      });
  });

  it('returns a token', () => {
    const user = new User({ email: 'test@test.com', password: 'NO' });
    return user.save()
      .then(user => {
        return user.authToken();
      })
      .then(token => {
        expect(token).toEqual(expect.any(String));
      });
  });
});
