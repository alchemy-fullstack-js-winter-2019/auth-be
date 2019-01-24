require('dotenv').config();
const jwt = require('jsonwebtoken');
const { tokenize, payloadify } = require('../../lib/utils/token');

describe('json web token', () => {
  it('can create a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    const body = jwt.verify(token, 'secret');
    expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number) });
  });

  it('can verify a token with an expiration', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret', { expiresIn: '1h' });
    const body = jwt.verify(token, 'secret');
    expect(body).toEqual({ 
      payload: { hi: 'there' }, 
      iat: expect.any(Number), 
      exp: expect.any(Number) 
    });
  });
  it('tokenize function returns a token', () => {
    const token = tokenize({ hi: 'there' });
    expect(token).toEqual(expect.any(String));
  });
  it('can untokenize ', () => {
    const token = tokenize({ hi: 'there' });    
    const payload = payloadify(token);
    expect(payload).toEqual({ hi: 'there' });
  });
});
