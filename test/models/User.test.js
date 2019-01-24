require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const { Types } = require('mongoose');
const User = require('../../lib/models/User');

describe('user model', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ 
      email: 'test@test.com',
      _id: expect.any(Types.ObjectId) 
    });
  });

  it('has a require email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Email required');
  });

  it('stores a _tempPassword', () => {
    const user = new User({ email: 'test@test.com', password: 'password123' });
    expect(user._tempPassword).toEqual('password123');
  });

  it('can save password hash', () => {
    return User.create({
      email: 'test@test.com',
      password: 'password123'
    })
      .then(user => {
        expect(user.passwordHash).toEqual(expect.any(String));
        expect(user.password).toBeUndefined();
      });
  });
});
