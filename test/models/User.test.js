require('dotenv').config();
require('../../lib/utils/connect')();


const User = require('../../lib/models/User');
const { Types } = require('mongoose');
const mongoose = require('mongoose');
const { tokenize, untokenize } = require('../../lib/utils/token');



describe('User model', () => {

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('validates a good model', () =>  {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(Types.ObjectId) });
  });

  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    // console.log('Errors', errors);
    expect(errors.email.message).toEqual('Email required');
  });

  it('stores a _tempPassword', () => {
    const user = new User({ email: 'carmen@email.com', password: 'password' });
    expect(user._tempPassword).toEqual('password');
  });

  it('password hash is set after user.save()', () => {
    // const user = new User({ email: 'carmen@email.com', password: 'password' });
    // user.save();

    return User.create({ 
      email: 'carmen@email.com', 
      password: 'password' 
    })
      .then(user => {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.password).toBeUndefined();        
      });      
  });  

  it('can compare good passwords', () => {
    return User.create({
      email: 'carmen@email.com', 
      password: 'pa55w0rd' 
    })
      .then(user => {
        return user.compare('pa55w0rd');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('can compare bad passwords', () => {
    return User.create({
      email: 'carmen@email.com', 
      password: 'pa55w0rd' 
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
      email: 'carmen@email.com', 
      password: 'pa55w0rd'
    })
      .then(user => {
        // create token with tokenize
        const token = tokenize(user);
        
        // -> then findByToken (token)
        return User.findByToken(token);
      })
      .then(userFromToken => {
        expect(userFromToken).toEqual({
          email: 'carmen@email.com', 
          _id: expect.any(String),
        });
      });
  });

  it('can create auth token', () => {
    return User.create({
      email: 'carmen@email.com', 
      password: 'pa55w0rd'
    })
      .then(user => user.authToken())
      .then(untokenize) 
      .then(user => {
        expect(user).toEqual({
          email: 'carmen@email.com', 
          _id: expect.any(String),
        });
      });        
  });

});








