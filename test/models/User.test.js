require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const User = require('../../lib/models/User');

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
    // console.log(user); // returns { _id: 5c4a3ea7056e1e0afd9baf1b, email: 'e@e.com' }
    expect(user._tempPassword).toEqual('abc123');
  });

  it('has a passwordHash', () => {
    const user = new User({
      email: 'b@b.com',
      password: 'booboo'
    });
    user.save()
      .then(user => {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.passwordHash).toBeDefined();
      });
    // v static method, similar as above (instance method)
    // return User.create({
    //   email: 'b@b.com',
    //   password: 'booboo'
    // })
    //   .then(user => {
    //     expect(user.passwordHash).toEqual(expect.any(String));
    //     expect(user.passwordHash).toBeDefined();
    //   });
  });

  it('can compare passwords', () => {
    return User.create({
      email: 't@t.com',
      password: 'booboo'
    })
      .then(user => {
        return user.compare('booboo');
      })
      .then(res => {
        expect(res).toBeTruthy();
      });
  });

  it('can compare bad passwords', () => {
    return User.create({
      email: 't@t.com',
      password: 'booboo'
    })
      .then(user => {
        return user.compare('coo');
      })
      .then(res => {
        expect(res).toBeFalsy();
      });
  });
});
