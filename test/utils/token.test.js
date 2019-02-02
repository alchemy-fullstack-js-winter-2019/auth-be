const jwt = require('jsonwebtoken');
const { tokenize, untokenize } = require('../../lib/utils/token');
require('dotenv').config();

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
  it('can verify a token with expiration', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret', { expiresIn: '1h' });
    const body = jwt.verify(token, 'secret', { expiresIn: '1h' });
    expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number), exp: expect.any(Number) });
  });
  it('can use tokenize function to return a token', () => {
    const token = tokenize({ hi: 'there' });
    expect(token).toEqual(expect.any(String));
  });
  it('uses untokenize to function to get a payload', () => {
    const token = tokenize({ hi: 'there' });
    const payload = untokenize(token);
    expect(payload).toEqual({ hi: 'there' });
  });
});

