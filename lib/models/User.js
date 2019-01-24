const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = User;
