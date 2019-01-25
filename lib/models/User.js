const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const { tokenize, untokenize } = require('../utils/token');

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
  passwordHash: String,
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash,
      delete ret.__v;
    }
  }
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

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};

userSchema.statics.findByToken = function(token) {
  return untokenize(token);
};

userSchema.methods.authToken = function() {
  const user = this.toJSON();
  return tokenize(user);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
