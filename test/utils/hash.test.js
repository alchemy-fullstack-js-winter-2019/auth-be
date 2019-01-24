const bcryptjs = require('bcryptjs');

describe('auth-be app', () => {
  it('hashes a password', () => {
    return bcryptjs.hash('password', 10)
    .then(hashedPassword => {
      console.log(hashedPassword);
      expect(hashedPassword).toBeDefined()
    })
  });
});
