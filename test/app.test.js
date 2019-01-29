const { bearerToken, ensureAuth } = require('../lib/middleware/ensureUser');

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
    const req = { get: () => 'abcd1234' };
    const next = jest.fn();
    ensureAuth(req, {}, next);
    expect(req.token).toEqual('abcd1234');
    expect(next).toHaveBeenCalled();
  });
});
