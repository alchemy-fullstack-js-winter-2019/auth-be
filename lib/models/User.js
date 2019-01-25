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
            delete ret.__v;
            delete ret.passwordHash;
        }
    }
});

userSchema.virtual('password')
    .set(function(password) {
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
    compare(password, this.passwordHash);
};

userSchema.statics.findByToken = function(token) {
    return untokenize(token);
};
userSchema.methods.authToken = function(token) {
    return tokenize(token);
};

const User = mongoose.model('User', userSchema);
module.exports = User ;
