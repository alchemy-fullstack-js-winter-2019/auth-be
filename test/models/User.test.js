require('dotenv').config();
require('../../lib/utils/connect')();
const { Types } = require('mongoose');
const User = require('../../lib/models/User');
const { tokenize } = require('../../lib/utils/token');
const mongoose = require('mongoose');

describe('user test', () => {
    beforeEach(done => {
        mongoose.connection.dropDatabase(done);
    });
    it('validates a good model', () => {
        const user = new User({ email: 'test@test.com' });
        expect(user.toJSON()).toEqual({ email: 'test@test.com', _id: expect.any(Types.ObjectId) });
    });
    it('has a required email', () => { 
        const user = new User({});
        const errors = user.validateSync().errors;
        expect(errors.email.message).toEqual('Email required');
    });
    it('stores a temporary password', () => {
        const user = new User({ email: 'email@email.com', password: 'password' });
        expect(user._tempPassword).toEqual('password');
    });
    it('save the password hash', () => {
        return User.create({
            email: 'email@email.com', 
            password: 'password' 
        })
            .then(user => { 
                expect(user.passwordHash).toEqual(expect.any(String));
                expect(user.password).toBeUndefined();
            });
    });
    it('compared two password hashes', () => {
        return User.create({
            email: 'email@email.com', 
            password: 'password' 
        })
            .then(user => {
                return user.compare('password2');
            })
            .then(result => { 
                expect(result).toBeFalsy();
            });
    });
    it('can find a user by token', () => {
        return User.create({
            email: 'email@email.com', 
            password: 'password' 
        })
            .then(user => tokenize(user))
            .then(token => User.findByToken(token))
            .then(userFromToken => {
                expect(userFromToken).toEqual({
                    email: 'email@email.com',
                    _id: expect.any(String),
                });

            });
    });
    it('return everything but the version and password hash', () => {
        return User.create({
            email: 'email@email.com', 
            password: 'password' 
        })
            .then(user => tokenize(user))
            .then(token => User.findByToken(token))
            .then(userFromToken => {
                expect(userFromToken).toEqual({
                    email: 'email@email.com',
                    _id: expect.any(String)
                });

            });
    });
    it('it can create an auth token', () => {
        return User.create({
            email: 'email@email.com', 
            password: 'password' 
        })
            .then(user => user.authToken())
            .then(token => {
                expect(token).toEqual(expect.any(String));
            });
    });
});
