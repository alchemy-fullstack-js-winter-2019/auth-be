// eslint-disable-next-line no-unused-vars
const { bearerToken, ensureAuth } = require('../middleware/ensureAuth');
const { tokenize } = require('../middleware/ensureAuth');

describe('ensureAuth', () => {
  it('can get a bearer token', () => {

    const req = {
      get: () => 'Bearer abcd1234'
    };

    const next = jest.fn();

    bearerToken(req, {}, next);

    expect(req.token).toEqual('abcd1234');
    expect(next).toHaveBeenCalled();
  });

  it('can ensure an auth', () => {
    const token = tokenize({ email: 'test@test.com' });

    const req = {
      token
    };

    const next = jest.fn();

    ensureAuth(req, {}, next)
      .then(() => {
        expect(req.user).toEqual({ email: 'test@test.com' });
      });
    
  
  });

});
