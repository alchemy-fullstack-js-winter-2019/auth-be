const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const { untokenize, tokenize } = require('../utils/token');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true
  }, 
  passwordHash: String
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v,
      delete ret.passwordHash;
    }
  }
});

userSchema.pre('save', function(next){
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};

userSchema.methods.authToken = function() {
  return tokenize(this.toJSON);
};

userSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenize(token));
  
};

const User = mongoose.model('User', userSchema);

module.exports = User;
