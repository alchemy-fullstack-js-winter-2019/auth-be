require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const User = require('../../lib/models/User'); //importing our user
const { tokenize } = require('../../lib/utils/token');



describe('models', () => {
  beforeEach((done) => { 
    mongoose.connection.dropDatabase(done);
  });
  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' }); //creating a new user and pass it a email address
    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(Types.ObjectId) }); //expect user to equal to have email address and id
  });
  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors; //grabs errors
    // console.log('ERRORS', errors);
    expect(errors.email.message).toEqual('Path `email` is required.');
  });
  it('stores a _tempPassword', () => {
    const user = new User({ email: 'wdifng@gmail.com', password: 'w345' }); //User is setting their password and usernamescreating a new user and passing in their email and password
    expect(user._tempPassword).toEqual('w345');
  });

  it('has a passwordHash', () => {
    // const user = new User({
    //   email: 'test@test.com',
    //   password:'wer'
    // });
    // user.save();

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
    //create a new user
    return User.create({
      email: 'test@test.com',
      password: 'p455w0rd'
    })
    //compare passwords
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
        return user.compare('badPassword'); //user inputs password and it does not match records
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });

  it('can find a user token', () => { //give it a token and gives us a user back
    //user has to exist before we can find a user Step 1- create a user
    return User.create({
      email: 'test@test.com',
      password: 'p455w0rd'
    })
      .then(user => {
        const token = tokenize(user); //create a token for user
        return User.findByToken(token); //find user by token
      })
      
    //  .then(user => { //create a token out of that user
    //    //create a token by the user with tokenize
    //     const token = tokenize(user);
    //     return User.findByToken(token);
    //    //-> then findByToken(token)
    //  })
      .then(userFromToken => { //expect to find a user out of that tokenresult is everything that the created user has
        expect(userFromToken).toEqual({
          email: 'test@test.com',
          //  passwordHash: expect.any(String),
          _id: expect.any(String), //find user by token and get user back
        //  __v: 0
        });
      });
  });
  it('can create an authToken', () => {
    return User.create({ //1st create user
      email: 'weigh@yahoo.com',
      password: 'pse95'
    })
      .then(user => user.authToken())  //after we have a user we want to
      .then(token => {
        expect(token).toEqual(expect.any(String));
      });
  }); 
});

