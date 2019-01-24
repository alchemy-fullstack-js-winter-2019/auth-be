const mongoose = require('mongoose');
const { hash } = require('../../lib/utils/hash');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
      },
      message: props => `'${props.value}' is not a valid email!`
    },
    unique: true,
    required: [true, 'Email is required.']
  },
  passwordHash: {
    type: String
  }
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

const User = mongoose.model('User', userSchema);

module.exports = User;
