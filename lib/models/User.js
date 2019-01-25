const mongoose = require('mongoose');
const { hash } = require('../utils/hash');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  passwordHash: String

});

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

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};

userSchema.statics.findByToken = function(token) {
  //untokenize(token)
  // return user
};

module.exports = mongoose.model('User', userSchema);
