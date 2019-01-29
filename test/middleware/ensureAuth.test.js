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

  it.skip('can ensure a token is authorized', () => {
    const req = 'Bearer abcd1234';
    const next = jest.fn(); // creates a fake function
    ensureAuth(req, {}, next);
    // console.log(req.token);
    expect(next).toHaveBeenCalled();
  });
});
