const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true
  }, 
  passwordHash: String
  
});

userSchema.pre('save', function(next){
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
