require('dotenv').config();
const { bearerToken, ensureAuth } = require('../lib/middleware/ensureAuth');
const { tokenize } = require('../lib/utils/token');
describe('ensureAuth', ()=> {
  it('can get a token of a bearer', () => {
    const req = {
      get: () => 'Bearer pass1233'
    };
    const next = jest.fn();

    bearerToken(req, {}, next);
    expect(req.token).toEqual('pass1233');
    expect(next).toHaveBeenCalled();
  });

  it('can ensure auth', () => {
    const token = tokenize({ email: 'mine@email.com' });
    const req = {
      token
    };

    const next = jest.fn();

    ensureAuth(req, {}, next)
      .then(() => {
        expect(req.user).toEqual({ email: 'mine@email.com' });
        expect(next).toHaveBeenCalled();
      });
  });

});
