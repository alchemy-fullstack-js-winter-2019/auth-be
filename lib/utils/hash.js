const bcrypt = require('bcryptjs'); 

const SALT_ROUNDS = 10; //setting

const hash = (str) => { //function called hash takes a string and returns a promise
  return bcrypt.hash(str, SALT_ROUNDS); 
};

const compare = (str, hash) => {
  return bcrypt.compare(str, hash); 
};

module.exports = {
  compare,
  hash
};