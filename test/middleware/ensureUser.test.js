require('dotenv').config();
require('../../lib/utils/connect')();
const { bearerToken, ensureAuth } = require('../../lib/middleware/ensureUser');

describe('ensureUser middleware', () => {
  it('can get a bearer token', () => {
    const req = {
      get: () => 'Bearer abcd123'
    };
    const next = jest.fn();
    
    bearerToken(req, {}, next);

    expect(req.token).toEqual('abcd123');
    expect(next).toHaveBeenCalled();
  });

  it('can ensure auth', () => {
    const req = {
      get: () => 'abcd123'
    };
    const next = jest.fn();
    
    bearerToken(req, {}, next);
    ensureAuth(req, {}, next);

    expect(next).toHaveBeenCalled();
  });
});
