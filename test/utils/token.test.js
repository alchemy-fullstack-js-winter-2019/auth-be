require('dotenv').config();
const jwt = require('jsonwebtoken');
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('web token', () => {
  it('can create a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret'); //pass payload, secret is a way to create different jwt tokens
    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret'); //when sign create token
    const body = jwt.verify(token, 'secret'); //when verifying it take the token and converts it into JSON object
    expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number) });
  });

  it('can verify a token with expiration', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'secret',  { expiresIn: '1h' }); //created a webtoken with expiration time
    const body = jwt.verify(token, 'secret'); 
    expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number), exp: expect.any(Number) });
  });

  it('takes playload and returns a token', () => {
    const token = tokenize({ hi: 'there' }); //declaring a token passing payload
    expect(token).toEqual(expect.any(String));
  });

  it('can untokenize a payload', () => {
    const token = tokenize({ hi: 'there' }); //create a new token 
    const payload = untokenize(token); //will equal to 
    expect(payload).toEqual({ hi: 'there' });
  });
});
