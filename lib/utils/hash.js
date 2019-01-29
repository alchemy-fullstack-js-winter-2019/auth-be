const bcrypt = require('bcryptjs'); 

const SALT_ROUNDS = 10; //setting

const hash = (str) => { //function called hash takes a string and returns a promise
  return bcrypt.hash(str, SALT_ROUNDS); //will return a promise of a resolved 
};

const compare = (str, hash) => { //
  return bcrypt.compare(str, hash); //returns a promise that resolves to true or false
};

module.exports = {
  compare,
  hash
};
