const User = require('../../lib/models/User');

describe('user model', () => {
  it('validates a good model', () => {
    const user = new User({
      name: 'kristin',
      email: 'test@test.com'
    });
  });
});
