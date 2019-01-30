const bcrypt = require('bcryptjs');
const { hash, compare } = require('../../lib/utils/hash');


describe('hashing functions', () => {
  it('hashes a password', () => {
    const hashedPassword = bcrypt.hash('password', 10)
      .then(hashedPassword => {
        console.log(hashedPassword);
      });
    expect(hashedPassword).toBeDefined();
  });

  it('creates hashed passwords that are different', () => { 
    const password = 'password';
    return bcrypt.hash(password, 10)
      .then(hashedPassword => {
        return bcrypt.hash(password, 10)
          .then(hashedPassword2 => {
            expect(hashedPassword).not.toEqual(hashedPassword2);
          });
      }); 
  });

  it('creates the same hash given the same salt', () => {
    const salt = '$2b$10$MJlKUYfDSChGFV78LIOPkj';
    return bcrypt.hash('password', salt)
      .then(hashedPassword3 => {
        return bcrypt.hash('password', salt)
          .then(hashedPassword4 => {
            expect(hashedPassword3).toEqual(hashedPassword4);
          });
      });
  });

  it('can compare hashes based on the same password', () => {
    return bcrypt.hash('password', 10)
      .then(hashedPassword => {
        return bcrypt.compare('password', hashedPassword);
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('can hash a password', () => {
    return hash('password')
      .then(hashedPassword => {
        console.log(hashedPassword);
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toEqual('password');
      });
  });

  it('can compare a password and hash', () => {
    return hash('password')
      .then(hashedPassword => {
        return compare('password', hashedPassword);
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('can compare a bad password and string', () => {
    return hash('password')
      .then(hashedPassword => {
        return compare('badpassword', hashedPassword);
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });
});
