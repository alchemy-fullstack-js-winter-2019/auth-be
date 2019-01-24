require('dotenv').config();

const jwt = require('jsonwebtoken');
const { 
  tokenize,
  untokenize
} = require('../../lib/utils/token');

// We create a JWT to store session data for our users

describe('JSON web tokens tests', () => {

  it('can create a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    const body = jwt.verify(token, 'secret');
    expect(body).toEqual({ 
      payload: { hi: 'there' }, 
      iat: expect.any(Number) 
      // iat is when the JWT was issued
    });
  });

  it('can verify a token with expiration', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret', { expiresIn: '1h' });
    const body = jwt.verify(token, 'secret');
    expect(body).toEqual({ 
      payload: { hi: 'there' }, 
      iat: expect.any(Number), 
      exp: expect.any(Number) 
    });
  });

  it('can tokenize a payload', () => {
    const token = tokenize({ hi: 'there' });
    expect(token).toEqual(expect.any(String));
  });

  it('untokenize a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret', { expiresIn: '1h' });
    const payload = untokenize(token);
    expect(payload).toEqual({ hi: 'there' });
  });


});
