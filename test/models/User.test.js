const User = require('../../lib/models/User');

describe('hashing functions', () => {
  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(Object) });
  });
  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
  });
  it('stores a _tempPassword', () => {
    const user = new User({ 
      email: 'test@test.com', 
      password: 'password' 
    });
    expect(user._tempPassword).toEqual('password');
  });
});
