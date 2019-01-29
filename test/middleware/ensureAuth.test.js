require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const {
  ensureAuth,
  bearerToken
} = require('../../lib/middleware/ensureUser');

describe('ensureAuth', () => {
  it('can get a bearer token', () => {
    const req = {
      get: () => 'Bearer abcd1234'
    };
    const next = jest.fn(); // creates a fake function
    bearerToken(req, {}, next);
    expect(req.token).toEqual('abcd1234');
    expect(next).toHaveBeenCalled();
  });

  it('can ensure a token is authorized', () => {
    // use tokenize to create a token
    const token = tokenize({
      email: 'test@test.com'
    });
    // create req with the token
    const req = { token };
    const next = jest.fn(); // creates a fake function
    ensureAuth(req, {}, next)
      .then(() => {
        // expect req.user to equal the token payload
        expect(req.user).toEqual({
          email: 'test@test.com'
        });
        expect(next).toHaveBeenCalled();
      });
  });
});
