const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('user model', () => {
  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(mongoose.Types.ObjectId) });
  });
});
