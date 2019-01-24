const mongoose = require('mongoose');

const user = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
      }
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
