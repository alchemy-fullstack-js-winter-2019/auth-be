const jwt = require('jsonwebtoken');
require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('json web tokens', () => {
  it('can create a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const token = jwt.sign({ payload: { hi: 'cats' } }, 'secret');
    const body = jwt.verify(token, 'secret');
    expect(body).toEqual({ 
      payload: { hi: 'cats' }, 
      iat: expect.any(Number) });
  });

  it('can verify a token with expiration', () => { 
    const token = jwt.sign({ payload: { hi: 'fulldarknostars' } }, 'secret', { expiresIn: '1h' });
    const body = jwt.verify(token, 'secret', { expiresIn: '1h' });
    expect(body).toEqual({ 
      payload: { hi: 'fulldarknostars' }, 
      iat: expect.any(Number), 
      exp: expect.any(Number) });
  });

  it('create new token with tokenize function', () => {
    const payload = { payload: { hi: 'there' } };
    const token = tokenize(payload);
    expect(token).toEqual(expect.any(String));
  });
  
  it('return a payload from a given token using untokenize function', () => {
    const payload = { payload: { hi: 'there' } };
    const token = tokenize(payload);
    const tokenNoMore = untokenize(token);
    expect(tokenNoMore).toEqual({ payload: { hi: 'there' } });
  });
});
