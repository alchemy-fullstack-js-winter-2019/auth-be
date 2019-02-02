require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const User = require('../../lib/models/User'); 
const { tokenize } = require('../../lib/utils/token');

describe('models', () => {
  beforeEach((done) => { 
    mongoose.connection.dropDatabase(done);
  });
  
  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' }); //creates a new user and pass it an email address
    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(Types.ObjectId) }); //expect user to have email address and id
  });
  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors; //grabs errors
    // console.log('ERRORS', errors);
    expect(errors.email.message).toEqual('Path `email` is required.');
  });
  it('stores a _tempPassword', () => {
    const user = new User({ email: 'wdifng@gmail.com', password: 'w345' }); //User is setting their password and usernames
    expect(user._tempPassword).toEqual('w345');
  });

  it('has a passwordHash', () => {
    return User.create({
      email: 'test@test.com',
      password: 'p455w0rd',
    })
      .then(user => {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.password).toBeUndefined();
      });
  });
  it('can compare good passwords', () => {
    return User.create({
      email: 'test@test.com',
      password: 'p455w0rd'
    })
      .then(user => {
        return user.compare('p455w0rd'); //way of telling user passed in the correct password
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('can compare bad passwords', () => {
    return User.create({
      email: 'test@test.com',
      password: 'p455w0rd'
    })
      .then(user => {
        return user.compare('badPassword'); 
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });

  it('can find a user token', () => { 
    return User.create({
      email: 'test@test.com',
      password: 'p455w0rd'
    })
      .then(user => {
        const token = tokenize(user); 
        return User.findByToken(token); 
      })
      
      .then(userFromToken => {
        expect(userFromToken).toEqual({
          email: 'test@test.com',
          _id: expect.any(String), 
        });
      });
  });
  it('can create an authToken', () => {
    return User.create({ 
      email: 'weigh@yahoo.com',
      password: 'pse95'
    })
      .then(user => user.authToken())  
      .then(token => {
        expect(token).toEqual(expect.any(String));
      });
  }); 
});

