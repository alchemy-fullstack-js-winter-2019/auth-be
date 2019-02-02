const bcrypt = require('bcryptjs');
const { hash, compare } = require('../../lib/utils/hash');

describe('hassing functions', () => {
  it('hashes a password', () => {
    return bcrypt.hash('password', 10)  
      .then(hashedPassword => { 
        expect(hashedPassword).toBeDefined(); 
      });
  });
  it('creates hashed passwords that are different', () => {
    return bcrypt.hash('password', 10) 
      .then(hashedPassword1 => { 
        return bcrypt.hash('password', 10)
          .then(hashedPassword2 => {
            expect(hashedPassword1).not.toEqual(hashedPassword2);
          });
      });
  });
  it('creates the same hash given the same salt', () => {
    const password = 'passowrd';
    const versionInfo = '$2b$10$'; 
    const salt = 'ABCDEFGHIJKLMNOPQRSTUV';
    const bcryptSalt = `${versionInfo}${salt}`; 
    return bcrypt.hash(password, bcryptSalt) 
      .then(hashedPassword => {
        return Promise.all([ 
          Promise.resolve(hashedPassword), //creates the fake promise that resolved with the hashedpassword
          bcrypt.hash(password, bcryptSalt) 
        ]);
      })
      .then(([hash1, hash2]) => {
        expect(hash1).toEqual(hash2); 
      });
  });
  it('can compare hashes basedon on the same password', () => {
    const password = 'password'; 
    return bcrypt.hash('password', 10) 
      .then(hashedPassword => {
        return bcrypt.compare(password, hashedPassword); 
      })
      .then(result => { 
        expect(result).toBeTruthy();
      });
  });

  it('can compare hashes based on different password', () => {
    return bcrypt.hash('password', 10) //returning the hash password
      .then(hashedPassword => {
        return bcrypt.compare('badPassword', hashedPassword); 
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });

  it('can hash a password', () => {
    return hash('password')
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toEqual('password');
      });
  });

  it('compares password', () => {
    return hash('password') 
      .then(hashedPassword => { 
        return compare ('password', hashedPassword); 
      })
      .then(result => { 
        expect(result).toBeTruthy();
      });
  });

  it('can compare a bad password and string', () => {
    return hash('password') //this is hasing a password 
      .then(hashedPassword => { //take hashpassword
        return compare('badpassword', hashedPassword);
      })
      .then(result => { 
        expect(result).toBeFalsy(); 
      });
  });
});
