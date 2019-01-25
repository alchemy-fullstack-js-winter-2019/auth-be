const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true
  },
  passwordHash: String,
});

userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});

userSchema.pre('save', function(next) {
  return hash(this._tempPassword)
    .then(hashed => {
      this.passwordHash = hashed;
      next();
    });
});

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};


module.exports = mongoose.model('User', userSchema);
