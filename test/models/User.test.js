require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');

const User = require('../../lib/models/User');

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
});
