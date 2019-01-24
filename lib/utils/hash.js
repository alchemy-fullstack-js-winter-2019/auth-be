
const bcryptjs = require('bcryptjs');

const hashFunction = (p) => {
    return bcryptjs.hash(p, 10)
        .then(hp => {
            return hp;
        });
};
const compareFunction = (p, h) => {
    return bcryptjs.compare(p, h);
};

module.exports = { hashFunction, compareFunction };