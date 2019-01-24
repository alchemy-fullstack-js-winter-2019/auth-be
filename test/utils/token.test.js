const jwt = require('jsonwebtoken');

describe('tokens', () => {
  it('can create a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'seekrat');
    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'seekrat');
    const body = jwt.verify(token, 'seekrat');
    expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number) });
  });
});
