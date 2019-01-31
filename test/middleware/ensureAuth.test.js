require('dotenv').config();
const { ensureAuth, bearerToken } = require('../../lib/middleware/ensureAuth');
const { tokenized } = require('../../lib/utils/token');


describe('does things', () => {
    it('test bearer function', () => {
        const req = {
            get: () => 'Bearer 123'
        };
        const next = jest.fn();
        bearerToken(req, {}, next);
        expect(req.token).toEqual('123');
        expect(next).toHaveBeenCalled();
    });

    it('test ensureAuth function', () => {
        const token  = tokenized({ email: 'test@gmail.com' });
        const req = {
            token
        };
        const next = jest.fn();
        ensureAuth(req, {}, next)
            .then(() => {
                expect(req.user).toEqual({ email: 'test@gmail.com' });

            });
    });
});