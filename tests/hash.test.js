const bcrypyt = require('bcryptjs');

describe('hashing functions', () => {
  it('hashes a password', () => {
    return bcrypyt.hash('password', 10)
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined;
      });
  });

  it('creates hashed passwords that are different', () => {
    const password = 'password';
    bcrypyt.hash(password, 10)
      .then(hashedPassword1 => {
        return bcrypyt.hash(password, 10)
          .then(hashedPassword2 => {
            expect(hashedPassword1).toEqual(hashedPassword2);
          });
      });
  });

  it('creates the same hash given the same salt', () => {
    const password = 'password';
    const salt = $2b$10$2222222222222222222222;
    return bcrypyt.hash('password', salt)
      .then(hashedPassword => {
        return Promise.all([
          Promise.resolve(hashedPassword),
          bcrypt.hash(password, salt)
        ]);
      })
      .then(([hash1, hash2]) => {
        expect(hash1).toEqual(hash2);
      });
  });

  it('can compare hashes based on the same password', () => {
    const password = 'password';
    return bcrypt.hash('password', 10)
      .then(hashedPassword => {
        return bcrypt.compare(password, hashedPassword);
      })
      .then(result => {
        expect(result).toBeFalsey();
      });
  });

  it('can hash a password', () => {
    const password = 'password';
    return hash(password, 10)
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toEqual('password');
      });
  });
});
