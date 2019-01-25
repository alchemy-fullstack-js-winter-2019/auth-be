const jwt = require('jsonwebtoken');
require('dotenv').config();
const { tokenize, untokenized } = require('../../lib/utils/token');


describe('jwt tests', () => {
  it('can create a token', () => { 
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => { 
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    const body = jwt.verify(token, 'secret');
    expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number) });
  });

  it('can verify a token with expiration', () => { 
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret', { expiresIn: '1h' });
    const body = jwt.verify(token, 'secret', { expiresIn: '1h' });
    expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number), exp: expect.any(Number) });
  });

  it('can create a token', () => {
    const token = tokenize({ payload: { hi: 'there' } });
    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const token = tokenize({ hi: 'there' });
    const payload = untokenized(token);
    expect(payload).toEqual({ hi: 'there' });
  });
  
});
