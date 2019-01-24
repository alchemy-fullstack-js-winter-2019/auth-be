const { Types } = require('mongoose');
const User = require('../../lib/models/User');

describe('User model', () => {
  it('validates a good model', () => {
    const user = new user({ email: 'test@test.com' });
    expect(user.JSON).toEqual({ email: 'test@test.com', _id: expect.any(Object) });
  });

  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync();
    expect(errors.email.message).toEqual('');
  });
});