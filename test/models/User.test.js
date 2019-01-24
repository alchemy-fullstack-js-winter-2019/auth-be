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
    expect(errors.email['message']).toEqual('Email is required.');
  });

  it('can require an email to match a pattern', () => {
    const user = new User({ email: 'test' });
    const errors = user.validateSync().errors;
    expect(errors.email['message']).toEqual(
      '\'test\' is not a valid email!'
    );
  });

  it('stores a _tempPassword', () => {
    const user = new User({ email: 'e@e.com', password: 'abc123' });
    // console.log(user); // returns { _id: 5c4a3ea7056e1e0afd9baf1b, email: 'e@e.com' }
    expect(user._tempPassword).toEqual('abc123');
  });

  it('', () => {
    
  });
});
