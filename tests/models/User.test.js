require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const { tokenize } = require('../../lib/utils/token');

const User = require('../../lib/models/User');

describe('user model', () => {

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
    expect(errors.email.message).toEqual('Path `email` is required.');
    // eslint-disable-next-line no-console
    console.log(errors);
  });

  it('stores a _tempPassword', () => {
    const user = new User({ email: 'test@test.com', password: 'password' });
    expect(user._tempPassword).toEqual('password');
  });

  // it('password hash is stored after user.save', () => {
  //   const user = new User({ email: 'test@test.com', password: 'password' });
  //   user.save();
  //   expect(user).toContain('password');
  // });

  it('has a passwordHash', () => {
  
    return User.create({ 
      email: 'test@test.com', 
      password: 'password' 
    })
      .then(user => {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.password).toBeUndefined();
      });
    
  });

  it('can compare passwords', () => {
    return User.create({
      email: 'test@test.com',
      password: 'password'
    })
      .then(user => {
        return user.compare('password');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('can compare bad passwords', () => {
    return User.create({
      email: 'test@test.com',
      password: 'password'
    })
      .then(user => {
        return user.compare('badPassword');
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });

  it('can find a user by token', () => {
    return User.create({
      email: 'test@test.com',
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

  it('can create an auth token', () => {
    return User.create({
      email: 'test@test.com',
      password: 'password'
    })
      .then(user => user.authToken())
      .then(token => {
        expect(token).toEqual(expect.any(String));
      });
        
  });
});
      





