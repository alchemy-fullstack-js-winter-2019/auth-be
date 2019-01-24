const User = require('../../lib/models/User');

describe('User tests', () => {

  it('validates a good model', () => {
    const user = new User({ email: 'test@test.com' });
    expect(user.toJSON()).toEqual({ email: 'test@test.com' });
  });

  
});
