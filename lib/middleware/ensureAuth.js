const User = require('../../lib/models/User');
const HttpError = require('../../lib/middleware/error');

const bearerToken  = (req, res, next) => {
    const authHeader = req.get('Authorization') || '';
    const token = authHeader
        .replace(/Bearer\s/i, '');
    req.token = token;
    next();
};

const ensureAuth = (req, res, next) => {
    console.log(req.token);
    return User.findByToken(req.token)
        .then(user => {
            if(user) {
                req.user = user;
                next();
            }
            else {
                next(new HttpError(401, 'No Token Found'));
            }
        })
        .catch(next);
};



module.exports = { ensureAuth, bearerToken }; 