const User = require('../../lib/models/User');
const mongoose = require('mongoose');

describe('user model', () => {
  it('validates a good model', () => {
    const user = new User({
      email: 'test@test.com'
    });
    expect(user.toJSON()).toEqual({ 
      email: 'test@test.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required email', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    console.log(errors);
    expect(errors).toBeTruthy();
  });

  it('must be a valid email address entered', () => {
    const user = new User({
      email: 'invalidemail'
    });
    const errors = user.validateSync().errors;
    console.log(errors);
    expect(errors).toBeTruthy();
  });

  it('stores a _tempPassword', () => {

  });
});
