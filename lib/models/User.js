const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true
  }, 
  passwordHash: String
  
});
userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});
const User = mongoose.model('User', userSchema);

module.exports = User;
