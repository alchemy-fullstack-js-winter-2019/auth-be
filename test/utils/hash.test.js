const bcrypt = require('bcryptjs');
const { hash, compare } = require('../../lib/utils/hash');

describe('hash tests', () => {
  it('hashes a password', () => {
    return bcrypt.hash('password', 10)
    .then(hashedPassword => {
      expect(hashedPassword).toBeDefined();
    })
  });
  it('creates hashed passwords that are different', () => {
    return bcrypt.hash('password', 10)
    .then(hashedPass1 => {
      return bcrypt.hash('password', 10)
      .then(hashedPass2 => {
        expect(hashedPass1).not.toEqual(hashedPass2);
      })
    })
  });
  it('it creates the same hash given the same salt',() => {
    const salt = '$2b$10$1234567891234567891234';
    return bcrypt.hash('password', salt)
      .then(hashed1 => {
        return bcrypt.hash('password', salt)
          .then(hashed2 => {
            expect(hashed1).toEqual(hashed2)
          })
      })
  });
  it('it can compare hashes based on the same password', () => {
    return bcrypt.hash('password', 10)
      .then(hashed => {
        return bcrypt.compare('password', hashed)
        .then(result => {
          expect(result).toBeTruthy();
        })
      })
  });
  it('it can compare hashes based on different password', () => {
    return bcrypt.hash('password', 10)
      .then(hashed => {
        return bcrypt.compare('WRONG PASSWORD', hashed)
        .then(result => {
          expect(result).toBeFalsy();
        })
      })
  });
  it('uses hash function that returns a hashed password', () => {
    return hash('password')
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
      });
  });
  it('uses compare function to check if two same hashes are the same', () => {
    return hash('password')
      .then(hashedPassword => {
        return compare('password', hashedPassword)
          .then(res => {
            expect(res).toBeTruthy();
          })
      })
  });
  it('uses compare function to check if two different hashes are NOT the same', () => {
    return hash('password')
      .then(hashedPassword => {
        return compare('WRONGpassword', hashedPassword)
          .then(res => {
            expect(res).toBeFalsy();
          })
      })
  });
})

