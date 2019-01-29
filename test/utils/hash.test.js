const bcrypt = require('bcryptjs');
const { hash, compare } = require('../../lib/utils/hash');

describe('hassing functions', () => {
  it('hashes a password', () => {
    return bcrypt.hash('password', 10) //run the packet imported and added salt runs function 10 times to generate random number
      .then(hashedPassword => { //we are expecting a response of hashedPassword
        expect(hashedPassword).toBeDefined(); //.toBeEqual('')empty string to be able to read the password
      });
  });

  it('creates hashed passwords that are different', () => {
    return bcrypt.hash('password', 10) 
      .then(hashedPassword1 => { //can use a promise.all to make this nicer
        return bcrypt.hash('password', 10)
          .then(hashedPassword2 => {
            expect(hashedPassword1).not.toEqual(hashedPassword2);
          });
      });
  });
  // it('creates the same hash given the same salt', () => {
  //   return bcrypt.hash('password', '$2b$04$1236567850098765432123')
  //   .then(hashedPasswordOne => {
  //     return bcrypt.hash('password', salt)
  //       .then(hashedPasswordTwo => {
  //         expect(hashedPasswordOne).toEqual(hashedPasswordTwo);
  //       });
  //   });
  // });
  it('creates the same hash given the same salt', () => {
    const password = 'passowrd';
    const versionInfo = '$2b$10$'; //version and rounds
    const salt = 'ASDFGTRHYJUIKOLPERTYUI';
    const bcryptSalt = `${versionInfo}${salt}`; 
    return bcrypt.hash('password', bcryptSalt) 
      .then(hashedPassword => {
        return Promise.all([ //pass this hasedPassword2 + has2
          Promise.resolve(hashedPassword), //creates the fake promise that resolved with the hashedpassword
          bcrypt.hash(password, bcryptSalt) 
        ]);
      })
      .then(([hash1, hash2]) => {
        expect(hash1).toEqual(hash1); //same has because of the same salg
      });
  });
  it('can compare hashes basedon on the same password', () => {
    const password = 'password'; 

    return bcrypt.hash('password', 10) //return has from 
      .then(hashedPassword => {
        return bcrypt.compare(password, hashedPassword); 
      })
      .then(result => { //pass result 
        expect(result).toBeTruthy();
      });
    //   .then(result => {
    //     expect(result).toBeTruthy()
    //   })
  });

  it('can compare hashes based on different password', () => {
    return bcrypt.hash('password', 10) //returning the has password
      .then(hashedPassword => {
        return bcrypt.compare('badPassword', hashedPassword); 
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });

  it('can hash a password', () => {
    return hash('password') //passes it rhough function hash
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toEqual('password');
      });
  });

  it('compares password', () => {
    return hash('password') //returning hash password hashed password here 
      .then(hashedPassword => { //giving it some variable
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
      .then(result => { //then then result should befalse
        expect(result).toBeFalsy(); //expecting the result 
      });
  });
});
