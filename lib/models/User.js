const mongoose = require('mongoose');
const { hash } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  passwordHash: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: 'email is invalid'
    }
  }
});

userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});

userSchema.pre('save', function(next) {
  this.passwordHash = hash(this._tempPassword);
  next();
});

userSchema.methods.compare = function(ctpassword) {
  if(ctpassword === this.passwordHash) {
    return true;
  }
  else {
    return false;
  }
};

module.exports = mongoose.model('User', userSchema);
