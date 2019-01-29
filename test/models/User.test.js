require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const User = require('../.././lib/models/User');
const { tokenized } = require('../../lib/utils/token');



describe('test the user model', () => {
    beforeEach(done => {
        return mongoose.connection.dropDatabase(() => {
            done();
        });
    });

    it('validates a good model', () => {
        const user  = new User({ email: 'LOL@gmail.com' });
        expect(user.toJSON()).toEqual({ _id: expect.any(Object), email: 'LOL@gmail.com' });
    });
    it('tests that the model has a required email', () => {
        const user  = new User();
        const errors = user.validateSync().errors;
        expect(errors.email.message).toEqual('Path `email` is required.');

    });
    it('stores a temp password', () => {
        const user = new User({ email: 'LOL@gmail.com', password: 'YES' });
        expect(user._tempPassword).toEqual('YES');
    });
    it('saves the hashed clear password', () => {
        const user = new User({ email: 'LOL@gmail.com', password: 'YES' });
        user.save()
            .then(user => {
                expect(user.passwordHash).toEqual(expect.any(String));
            });
    });
    it('compares the clear the hashed password', () => {
        const user = new User({ email: 'LOL@gmail.com', password: 'YES' });
        return user.save()
            .then(user => {
                return user.compare('YES');
            })
            .then(result => {
                expect(result).toBeTruthy();
            });
    });
    it('can find a user from a token', () => {
        const user = new User({ email: 'LOL@gmail.com', password: 'YES' });
        return user.save()
            .then(user => {
                return tokenized(user);
            })
            .then(token => {
                return User.findByToken(token);
            })
            .then(user => {
                expect(user.email).toContain('LOL@gmail.com');
            });
    });
    it('can return a JSON object of the user without certain fields', () => {
        const user = new User({ email: 'LOL@gmail.com', password: 'YES' });
        return user.save()
            .then(user => {
                expect(user.email).toContain('LOL@gmail.com');
            });
    });
    it('it returns a JSON object using the static method', () => {
        const user = new User({ email: 'LOL@gmail.com', password: 'YES' });
        return user.save()
            .then(user => {
                return user.authToken();
            })
            .then(res => {
                expect(res).toEqual(expect.any(String));
            });
    });
});