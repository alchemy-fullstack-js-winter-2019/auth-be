const bcryptjs = require('bcryptjs');
const { hash, compare } = require('../../lib/utils/hash');
describe('testing hashing', () => {
    it('hashes a password', () => {
        return bcryptjs.hash('password', 10)
            .then(hashedPassword => {
                expect(hashedPassword).toBeDefined();
            });
    });
    it('encrypts the same password again', () => {
        return bcryptjs.hash('password', 10)
            .then(oldPassword => {
                return Promise.all([
                    Promise.resolve(oldPassword),
                    bcryptjs.hash('password', 10)
                ]);
            }).then(([oldPassword, hashedPassword]) => {
                expect(oldPassword).not.toEqual(hashedPassword);
            });
    });
    it('creates the same has given the same salt', () => {
        const password = 'password';
        const versionInfo = '$2b$10$';
        const salt = 'ABCDEFGHIJKLMNOPQRSTUV';
        const bcryptSalt = `${versionInfo}${salt}`;
        return bcryptjs.hash(password, bcryptSalt)
            .then(hashedPassword => {
                return Promise.all([
                    Promise.resolve(hashedPassword),
                    bcryptjs.hash(password, bcryptSalt)
                ]);
            })
            .then(([hash1, hash2]) => {
                expect(hash1).toEqual(hash2);
            });
    });
    it('compares the same passwords with salt', () => {
        const password = 'password';
        return bcryptjs.hash(password, 10)
            .then(hashedPassword => {
                return bcryptjs.compare(password, hashedPassword);
            })
            .then(result => {
                expect(result).toBeTruthy();
            });
    });
    it('compares the same passwords with salt', () => {
        const password = 'password';
        return bcryptjs.hash(password, 10)
            .then(hashedPassword => {
                return bcryptjs.compare('badPassword', hashedPassword);
            })
            .then(result => {
                expect(result).toBeFalsy();
            });
    });
    it('can hash a password', () => {
        return hash('password')
            .then(hashedPassword => {
                expect(hashedPassword).not.toEqual('password');
            });
    });
    it('compares the hash', () => {
        return hash('password')
            .then(hashedPassword => {
                return compare('badPassword', hashedPassword);
            })
            .then(result => {
                expect(result).toBeFalsy();
            });
    });
});
