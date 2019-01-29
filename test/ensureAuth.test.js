const { bearerToken } = require();

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

  it('can ensureAuth', () => {
    // use tokenize to create a token

    // create req with the token

    // expect req.user to equal the token payload
    
  });
});