require('dotenv').config();
const jwt = require('jsonwebtoken');
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('token functions', () => {
it('can create a token', () => {
  const token = jwt.sign({ payload: { hi: 'there' } }, 'secret');
  expect(token).toEqual(expect.any(String));
});
it('can verify a token', () => {
  const token = jwt.sign({ payload: { something: 'here' } }, 'secret');
  const body = jwt.verify(token, 'secret');
  expect(body).toEqual({ payload: { something: 'here' } , iat: expect.any(Number) }); 
});
it('can verify token with expiration', () => {
  const token = jwt.sign({ payload: { hi: 'there' } }, 'secret', { expiresIn: '1h' });
  const body = jwt.verify(token, 'secret');
  expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number), exp: expect.any(Number)
});
});
it('tokenize a payload', () => {
  const token = tokenize({ hi:'there' });
  expect(token).toEqual(expect.any(String));
})
it('untokenize a payload', () => {
  const token = tokenize({ hi: 'there' });
  const payload = untokenize(token);
  expect(payload).toEqual({ hi: 'there' });
})
});
