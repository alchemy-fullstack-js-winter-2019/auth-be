var jwt = require('jsonwebtoken');

const tokenized = (payload) => {
    return jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: '1h' });
};

const untokenized = (token) => {
    const body = jwt.verify(token, process.env.AUTH_SECRET);
    return body.payload;
};
module.exports = { tokenized, untokenized };