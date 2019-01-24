const jwt = require('jsonwebtoken');

describe('json web tokens', () => {
  it('can create a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const token = jwt.sign({ payload: { hi: 'cats' } }, 'secret');
    const body = jwt.verify(token, 'secret');
    expect(body).toEqual({ payload: { hi: 'cats' }, iat: expect.any(Number) });
  });
});
