require('dotenv').config();
const { bearerToken, ensureAuth } = require('../../lib/middleware/ensureAuth');
const { tokenize } = require('../../lib/utils/token');

describe('ensureAuth', () => {
  it('can get a bearer token', () => {
    //fake req.get
    // get is the key and the function is the value
    const req = {
      get: () => 'Bearer abcd1234'
    };

    // Make sure the next function actually gets called by using a mock function
    const next = jest.fn();

    // we never use the response so an empty object is passed
    bearerToken(req, {}, next);

    expect(req.token).toEqual('abcd1234');
    expect(next).toHaveBeenCalled();
  });

  it('can ensure auth token', () => {
    const token = tokenize({ email: 'test@test.com' });

    const req = {
      token
    };

    const next = jest.fn();

    ensureAuth(req, {}, next)
      .then(() => {
        expect(req.user).toEqual({ email: 'test@test.com' });
        expect(next).toHaveBeenCalled();
      });
  });

});
