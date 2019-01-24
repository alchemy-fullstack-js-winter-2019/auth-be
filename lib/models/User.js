const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);
