const bcryptjs = require('bcryptjs');

describe('bcrypt', () => {
  it('hashes a password', () => {
    return bcryptjs.hash('password', 10)
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
        console.log(hashedPassword);      
      });
  });

  it('creates hashed passwords that are different', () => {
    const password = 'roxy';
    return bcryptjs.hash(password, 10)
      .then(hashedPassword1 => {
        return bcryptjs.hash(password, 10)
          .then(hashedPassword2 => {
            expect(hashedPassword1).not.toEqual(hashedPassword2);
          });
      });
  });

  it('creates the same hash given the same salt', () => {
    const salt = '$2b$10$fkdlskei3lsjvbcneosntl';
    const password = 'roxy';
    return bcryptjs.hash(password, salt)
      .then(hashedPassword1 => {
        return bcryptjs.hash(password, salt) 
          .then(hashedPassword2 => {
            expect(hashedPassword1).toEqual(hashedPassword2);
          });
      });
  });
});
