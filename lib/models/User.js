const mongoose = require('mongoose');
const { hash } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true
  },
  passwordHash: {
    type: String
  }
});

// Setter - the string passed to virtual is associated with the key for the password in the new User instance.
// Cannot use an arrow function because 'this' will refer to the entire document
// The password passed to the function is the same as the value passed to the pasword key
userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});

userSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

module.exports = mongoose.model('User', userSchema);
