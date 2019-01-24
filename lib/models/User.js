const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: {
      validator: function(v) {
        // source: https://www.regextester.com/96927 
        return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  passwordHash: String
});

userSchema
  .virtual('password')
  .set(function(password) {
    this._tempPassword = password;
  });

userSchema
  .pre('save', function(next) {
    hash(this._tempPassword)
      .then(hashedPassword => {
        this.passwordHash = hashedPassword;
        next();
      });
  });

userSchema.methods.compare = function(_tempPassword) {
  return compare(_tempPassword, this.passwordHash);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
