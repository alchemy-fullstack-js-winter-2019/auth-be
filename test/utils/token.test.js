var jwt = require('jsonwebtoken');
const { tokenized, untokenized } = require('../../lib/utils//token');
require('dotenv').config();


describe('does nice JWT things', () => {
    it('can create a token', () => {
        const token = jwt.sign({ payload: { hi: 'there' } }, 'appsecret');
        expect(token).toEqual(expect.any(String));
    });

    it('can verify a token', () => {
        const token = jwt.sign({ payload: { hi: 'there' } }, 'appsecret');
        const body = jwt.verify(token, 'appsecret');
        expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number) });
    });
    it('can verify a token with expiration', () => {
        const token = jwt.sign({ payload: { hi: 'there' } }, 'appsecret', { expiresIn: '1h' });
        const body = jwt.verify(token, 'appsecret', { expiresIn: '1h' });
        expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number), exp: expect.any(Number) });
    });
    it('can extract a sign', () => {
        const payload = { name: 'lance' };
        const token = tokenized(payload);
        expect(token).toEqual(expect.any(String));
    });

    it('can verify a token', () => {
        const token = tokenized({ name: 'lance' });
        const payload = untokenized(token);
        expect(payload).toEqual({ name: 'lance' });
    });
});