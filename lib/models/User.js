const mongoose = require('mongoose');

const user = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
      },
      message: props => `'${props.value}' is not a valid email!`
    },
    unique: true,
    required: true
  },
  passwordHash: {
    type: String
  }
});

const User = mongoose.model('User', user);

module.exports = User;
