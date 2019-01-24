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
    expect(errors).toBeTruthy();
    expect(errors.email.message).toEqual('Path `email` is required.');
  });

  it('must be a valid email address entered', () => {
    const user = new User({
      email: 'invalidemail'
    });
    const errors = user.validateSync().errors;
    expect(errors).toBeTruthy();
    expect(errors.email.message).toEqual('email is invalid');
  });

  it('stores a _tempPassword', () => {
    const user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    expect(user._tempPassword).toEqual('password');
  });

  it('has a passwordHash', () => {
    const user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save()
      .then(user => {
        expect(user.passwordHash).toBeDefined();
        expect(user.password).toBeUndefined();
      });

  });

  it('returns true when clear text password matches the password hash', () => {
    const password = 'password';
    const user = User.create({ email: 'test@test.com', password });
    expect(user.compare(password)).toBeTruthy();
  });

  it('returns false when clear text password doesn\'t match the password hash', () => {
    const password = 'password';
    const user = User.create({ email: 'test@test.com', password });
    expect(user.compare('wrongpassword')).toBeFalsy();
  });
});
