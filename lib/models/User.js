const mongoose = require('mongoose');
const { 
  hash,
  compare 
} = require('../utils/hash');
const {
  untokenize,
  tokenize
} = require('../utils/token');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true
  },
  passwordHash: String
}, {
  // Customize toJSON to exclude version and passwordHash when returning user
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      delete ret.passwordHash;
    }
  }
});

// Setter - the string passed to virtual is associated with the key for the password in the new User instance.
// Cannot use an arrow function because 'this' will refer to the entire document
// The password passed to the function is the same as the value passed to the pasword key
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

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};

userSchema.statics.findByToken = function(token) {
  return untokenize(token); 
};

userSchema.methods.authToken = function() {
  return tokenize(this.toJSON());
};

module.exports = mongoose.model('User', userSchema);
