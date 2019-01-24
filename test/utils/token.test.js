const jwt = require('jsonwebtoken');

describe('tokens', () => {
  it('can create a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'seekrat');
    expect(token).toEqual(expect.any(String));
  });

});
