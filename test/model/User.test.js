const User = require('../../lib/models/User');
const { Types } = require('mongoose');

describe('User Model', () => {
  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ _id: expect.any(Types.ObjectId), email: 'test@test.com' });
  });

  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    const message = errors.email.message;
    expect(message).toEqual('Email is required.');
  });

  it('returns an error if badEmail', () => {
    const user = new User({ email: 'hi' });
    const errors = user.validateSync().errors;
    const message = errors.email.message;
    expect(message).toEqual(`${user.email} is not a valid email!`);
  });

  it('stores a _tempPassword', () => {
    const user = new User({ email: 'test@gmail.com', password: 'password' });
    expect(user._tempPassword).toEqual('password');
  });
});

