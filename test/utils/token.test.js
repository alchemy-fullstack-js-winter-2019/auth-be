const jwt = require('jsonwebtoken');

describe('jwt', () => {
  it('can create a token', () => {
    const token = jwt.sign({
      payload: {
        hi: 'there'
      }
    }, 'secret');
    expect(token).toEqual(expect.any(String));
  });

  
});

