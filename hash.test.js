const bcrypyt = require('bcryptjs');

describe('hashing functions', () => {
  it('hashes a password', () => {
    return bcrypyt.hash('password', 10)
      .then(hashedPassword => {
        expect(hashedPassword).toEqual('');
      });
  });
});
