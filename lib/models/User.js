
const mongoose = require('mongoose');
const { hashFunction } = require('../utils/hash');

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true
    },
    passwordHash: {
        type: String, 
        required: false
    }
});
userSchema.virtual('password').set(function(password) {
    this._tempPassword = password;
});
userSchema.pre('save', function(next) {
    hashFunction(this._tempPassword)
        .then(hashed => {
            this.passwordHash = hashed;
        });
    next;

});



const User = mongoose.model('User', userSchema);
module.exports = User;