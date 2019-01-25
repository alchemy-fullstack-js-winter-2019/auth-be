const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const { untokenize } = require('../utils/token');

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
},
{
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      delete ret.passwordHash;
    }
  }
}
);

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

userSchema.methods.compare = function(string) {
  return compare(string, this.passwordHash);
    
};

userSchema.statics.findByToken = function(token) {
  return untokenize(token);
};

module.exports = mongoose.model('User', userSchema);
