const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('user model', () => {
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
});
