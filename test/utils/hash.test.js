const bcryptjs = require('bcryptjs');
const { hashFunction, compareFunction } = require('../../lib/utils/hash');

describe('test bcrypt', () => {
    it('can hash a password', () => {
        const hashedpassword = bcryptjs.hash('password', 10)
            .then(hashedpassword => {
                console.log(hashedpassword);

            });
        expect(hashedpassword).toBeDefined();
    });

    it('creates hashed password that are different from the same password', () => {
        Promise.all([bcryptjs.hash('password', 10), bcryptjs.hash('password', 10)])
            .then(hashedPhrases => {
                console.log(hashedPhrases);
                expect(hashedPhrases[0]).not.toEqual(hashedPhrases[1]);
            });
    });
    it('can create the same hash given some salt', () => {
        const salt = '$2b$10$SALTYBOI42042042042042';
        return bcryptjs.hash('hello', salt)
            .then(hashedpassword => {
                return Promise.all([
                    Promise.resolve(hashedpassword), 
                    bcryptjs.hash('hello', salt)
                ]);
            })
            .then(([p1, p2]) => {
                expect(p1).toEqual(p2);
            });
    });
    it('can compare hashes', () => {
        return bcryptjs.hash('hello', 10)
            .then(res => {
                bcryptjs.compare('hello', res)
                    .then(result => {
                        console.log(result);
                        expect(result).toBeTruthy();
                    });
            });
    });

    it('can return a hashed password', () => {
        return hashFunction('password')
            .then(res => {
                expect(res).toBeDefined();
            });
    });

    it('can compare a password and hash', () => {
        return hashFunction('password')
            .then(hp => {
                return compareFunction('password', hp);
            })
            .then(res => {
                expect(res).toBeTruthy();
            });
    });
    it('can return false on a bad password', () => {
        return hashFunction('password')
            .then(hp => {
                return compareFunction('badpassword', hp);
            })
            .then(res => {
                expect(res).toBeFalsy();
            });
    });
});