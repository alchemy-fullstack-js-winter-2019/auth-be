const jwt = require('jsonwebtoken');
require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('jwt', () => {
  it('can create a token', () => {
    const token = jwt.sign({
      payload: {
        hi: 'there'
      }
    }, 'secret');
    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const token = jwt.sign({
      payload: {
        foo: 'bar'
      }
    }, 'backStreetBoys');
    const body = jwt.verify(token, 'backStreetBoys');
    // console.log(body); // returns { payload: { foo: 'bar' }, iat: 1548359241 }
    expect(body).toEqual({
      payload: {
        foo: 'bar' 
      }, iat: expect.any(Number)
    });
  });

  it('can verify a token with expiration', () => {
    const token = jwt.sign({
      payload: {
        bam: 'BAM'
      }
    }, 'nSync', {
      expiresIn: '1h' 
    });
    const body = jwt.verify(token, 'nSync');
    expect(body).toEqual({
      payload: {
        bam: 'BAM'
      }, iat: expect.any(Number), exp: expect.any(Number)
    });
  });

  it('can take a payload and return a token', () => {
    const token = tokenize({ hi: 'there' });
    expect(token).toEqual(expect.any(String));
  });

  it('can take a payload and untokenize it', () => {
    const token = tokenize({ hi: 'there' });
    const payload = untokenize(token);
    expect(payload).toEqual({ hi: 'there' });
  });

});

