const jwt = require('jsonwebtoken');

describe('jwt functions', () => {
  it('can create a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    expect(token).toEqual('');
  });

  it('can verify a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    const body = jwt.verify(token, 'secret');
    expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number) });
  });

  it('can verify a token with expiration', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    const body = jwt.verify(token, 'secret', { expiresIn: '1h' });
    expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number), exp: expect.any(Number) });
  });
});
