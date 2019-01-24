const bcrypt = require('bcryptjs');

describe('bcrypt', () => {
  it('hashes a password', () => {
    return bcrypt.hash('password', 10)
      .then(hashedPassword => {
        console.log(hashedPassword);
        expect(hashedPassword).toBeDefined();
      });
  });
  it('creates hashed passwords that are different', () => {
    return bcrypt.hash('password', 10)
      .then(password1 => {
        return bcrypt.hash('password', 10)
          .then(password2 => {
            expect(password1).not.toEqual(password2);
          });
      });
  });
  it('creates the same hash given the same salt', () => {
    const salt = '$2b$10$12jne9skdn3jdkskwopa98';
    return bcrypt.hash('password', salt)
      .then(password1 => {
        return bcrypt.hash('password', salt)
          .then(password2 => {
            expect(password1).toEqual(password2);
          });
      });
  });
});
