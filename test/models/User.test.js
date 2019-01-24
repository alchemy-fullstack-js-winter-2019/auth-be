const { Types } = require('mongoose');
const User = require('../../lib/models/User');

describe('User', () => {
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
    expect(errors.email['message']).toEqual('Path `email` is required.');
  });
});
