require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const { tokenize } = require('../../lib/utils/token');

describe('user model', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(mongoose.Types.ObjectId) });
  });

  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Email required');
  });

  it('stores a _tempPassword', () => {
    const user = new User({ email: 'test@test.com', password: 'PWORD' });
    expect(user._tempPassword).toEqual('PWORD');
  });

  it('can save a hashed password', () => {
    const user = new User({ email: 'test@test.com', password: 'PASSWORD' });
    user.save()
      .then(user => {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.password).toBeUndefined();
      });
  });

  it('can compare a password', () => {
    return User.create({
      email: 'test@email.com',
      password: 'password'
    })
      .then(user => {
        return user.compare('password');
      })
      .then(results => {
        expect(results).toBeTruthy();
      });
  });

  it('can compare a bad password', () => {
    return User.create({
      email: 'test@email.com',
      password: 'password'
    })
      .then(user => {
        return user.compare('badPassword');
      })
      .then(results => {
        expect(results).toBeFalsy();
      });
  });

  it('can find by token', () => {
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
          _id: expect.any(String)
        });
      });
  });
  it('deletes the __v and passwordHash', () => {
    return User.create({
      email: 'test@test.com', 
      password: 'password' 
    })
      .then(user => {
        expect(user.toJSON()).toEqual({
          email: 'test@test.com', 
          _id: expect.any(Object)
        });
      });
  });
  it('creates an auth token', () => {
    return User.create({
      email: 'test@test.com', 
      password: 'password' 
    })
      .then(user => {
        return user.authToken();
      })
      .then(token => {
        expect(token).toEqual(expect.any(String));
      });
  });

});

afterAll(done => {
  mongoose.connection.close(done);
});
