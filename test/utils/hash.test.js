const bcryptjs = require('bcryptjs');

describe('auth-be app', () => {
  it('hashes a password', () => {
    return bcryptjs.hash('password', 10)
    .then(hashedPassword => {
      console.log(hashedPassword);
      expect(hashedPassword).toBeDefined()
    })
  });

  it('creates hashed passwords that are different', () => {
    const password = 'password';
    return bcryptjs.hash(password, 10)
    .then(hashedPassword1 => {
      return Promise.all([
        Promise.resolve(hashedPassword1),
        bcryptjs.hash(password, 10)
      ]);
    })
    .then(([hash1, hash2]) => {
      console.log(hash1, hash2)
      expect(hash1).not.toEqual(hash2);
    });
  });

});
