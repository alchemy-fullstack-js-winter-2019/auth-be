const { ensureAuth, bearerToken } = require('../../lib/middleware/ensureAuth');


describe('does things', () => {
    it('test bearer function', () => {
        const req = {
            get: () => 'Bearer 123'
        }
        const next = jest.fn();
        bearerToken(req, {}, next);
        expect(req.token).toEqual('123');
        expect(next).toHaveBeenCalled();
    });
    it('test ensureAuth function', () => {
        const req = {
            get: () => 'Bearer 123'
        };
        const next = jest.fn();
        ensureAuth(req, {}, next);
    });
});