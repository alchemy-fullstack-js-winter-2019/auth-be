require('dotenv').config();
require('../../lib/utils/connect')();
const { bearerToken, ensureAuth } = require('../../lib/middleware/ensureUser');
const { tokenize } = require('../../lib/utils/token');

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
    const token = tokenize({ email: 'b@b.com' });
    const req = {
      token
    };
    const next = jest.fn();
    ensureAuth(req, {}, next)
      .then(() => {
        expect(req.user).toEqual({ email: 'b@b.com' });
        expect(next).toHaveBeenCalled();
      });   
  });
});
