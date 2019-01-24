require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const User = require('../.././lib/models/User');



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
        console.log(errors.email.message);
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
});