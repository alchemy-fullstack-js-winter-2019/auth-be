//dotenv will read our .env file.
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { tokenize, untokenize } = require('../lib/utils/token');


//jwt encrypts and decrypts tokens making it a  2 way decryptions compared to bcrypt

//jwt.verify will return everything. 

//jwt is sycnchronous code which is why we create the consts before the returns.
describe('jwt functions', () => {
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

  it('can untokenize a payload', () => {
    const token = tokenize({ hi: 'there' });
    const payload = untokenize(token);
    expect(payload).toEqual({ hi: 'there' });
  });
});

