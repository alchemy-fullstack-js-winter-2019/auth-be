const jwt = require('jsonwebtoken');

describe('jwt functions', () => {
  it('can create a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    expect(token).toEqual(expect.any(String));
  });
  it('can create and then verify token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    const body = jwt.verify(token, 'secret');
    expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number) });
  });
});

