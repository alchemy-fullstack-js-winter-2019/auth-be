const bcrypyt = require('bcryptjs');
const User = require('../../lib/models/User');

describe('user model', () => {
  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(Object) });
    
  });

  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.email.message).toEqual('Path `email` is required.');
    console.log(errors);
  });

  it('stores a _tempPassword', () => {
    const user = new User({ email: 'test@test.com', password: 'password' });
    expect(user._tempPassword).toEqual('password');
  });

  it('finds a user by token', () => {

  });
});


