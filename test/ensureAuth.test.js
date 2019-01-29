require('dotenv').config();
const { bearerToken, ensureAuth } = require('../lib/middleware/ensureAuth');
const { tokenize } = require('../lib/utils/token');

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

  it('can ensure auth', () => {
    // use tokenize to create a token
    const token = tokenize({ email: 'user@email.com' });

    //create req with the token
    const req = {
      token
    };
    const next = jest.fn();

    ensureAuth(req, {}, next)
      .then(() => {
        // expect req.user to equal the token payload
        expect(req.user).toEqual({ email: 'user@email.com' });
        expect(next).toHaveBeenCalled(1);
      });
  });
});
