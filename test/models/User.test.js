const { Types } = require('mongoose');
const User = require('../../lib/models/User');

describe('user model tests', () => {
  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(Types.ObjectId) });
  });
  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Email required');
  });
  it('stores a _tempPassword', () => {
    const user = new User({ email: 'test@test.com', password: 'abc' });
    expect(user._tempPassword).toEqual('abc');
  });
});
