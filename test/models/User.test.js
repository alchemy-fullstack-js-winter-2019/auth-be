require('dotenv').config();
const mongoose = require('mongoose');
require('../../lib/utils/connect')();
const User = require('../../lib/models/User');
const { Types, connection } = require('mongoose');
const { tokenize, untokenize } = require('../../lib/utils/token');
 



describe('Users ', () => {

  beforeEach(done => {
    return connection.dropDatabase(() => {
      done();
    });
  });
  afterAll((done) => {
    connection.close(done);
  });

  it('validates a good model', () => { 
    const user = new User({ email: 'email@email.com' });
    expect(user.toJSON()).toEqual({ email: 'email@email.com', _id: expect.any(Types.ObjectId)
    });
  });

  it('has a required email', () => { 
    const user = new User({});
    const errors = user.validateSync().errors; 
    expect(errors.email.message).toEqual('Email required');
  });

  it('stores a _tempPassword', () => {
    const user = new User({ 
      email: 'test@test.com', 
      password: 'p455w0rd' 
    });
    expect(user._tempPassword).toEqual('p455w0rd');
  });

  it('takes a temp password and hashes it', () => { 
    
    //example of a instance method
    // const user = new User({ 
    //   email: 'test@test.com', 
    //   passwordHash: 'p455w0rd' 
    // });
    // user.save();
    
    //example of a static method
    return User.create({
      email: 'test@test.com',
      password: 'p455w0rd'
    })
      .then(user => {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.password).toBeUndefined();
      });
  });
  it('can compare passwords aka good passwords', () => { 
    return User.create({
      email: 'test@test.com', 
      password: 'p455w0rd'  
    })
      .then(user => {
        return user.compare('p455w0rd');
      })
      .then(result => {
        console.log('Tags says', result);
        expect(result).toBeTruthy();
      });
  });
  it('can compare passwords aka bad passwords', () => { 
    return User.create({
      email: 'test@test.com', 
      password: 'p455w0rd'  
    })
      .then(user => {
        return user.compare('');
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });
  it('can find a user by token', () => {
    return User.create({
      email: 'test@test.com',
      password: 'p455w0rd'
    })
      .then(user => tokenize(user))
      .then(token => User.findByToken(token))
      .then(userFromToken => {
        console.log('banana',  userFromToken._id);
        // -> then expect to get a user
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
      .then(untokenize)
      .then(user => {
        expect(user).toEqual({
          email: 'test@test.com',
          _id: expect.any(String)
        });
      });
  });
  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
