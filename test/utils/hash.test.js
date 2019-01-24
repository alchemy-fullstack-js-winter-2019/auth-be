const bcryptjs = require('bcryptjs');

describe('bcrypt', () => {
  it('hashes a password', () => {
    bcryptjs.hash('password', 10)
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
        console.log(hashedPassword);      
      });
  });
});
