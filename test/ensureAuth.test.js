const { bearerToken, ensureAuth } = require('../lib/middleware/ensureAuth');

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
    const req = {
      get: () => 'Bearer abcd1234'
    };
    const next = jest.fn();

    ensureAuth(req, {}, next);

    expect(req.token).toEqual('abcd1234');
    expect(next).toHaveBeenCalled();
  });
});
