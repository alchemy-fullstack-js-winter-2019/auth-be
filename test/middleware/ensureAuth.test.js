require ('dotenv').config();
const { bearerToken, ensureAuth } = require('../../lib/middleware/ensureAuth');
const { tokenize } = require('../../lib/utils/token');

describe('ensureAuth', () => {
    it('can get a bearer token', () => {
        const req = {
            get: () => 'Bearer abcd1234'
        };
        //get: is same as get () {}, this returns req.get authHeader from ensureAuth.js

        const next = jest.fn();

        bearerToken(req, {}, next);

        expect(req.token).toEqual('abcd1234');
        expect(next).toHaveBeenCalled();
    });

    it('can ensureAuth', () => {
        const token = tokenize({ email: 'hey@gmail.com' });
        const req = {
            token
        };
        const next = jest.fn();

        ensureAuth(req, {}, next)
            .then(() => {
                expect(req.user).toEqual({ email: 'hey@gmail.com' });
                expect(next).toHaveBeenCalled();
            });
    });
});
