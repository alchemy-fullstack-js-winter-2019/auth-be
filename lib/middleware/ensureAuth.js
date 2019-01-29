const User = require('../../lib/models/User');
const HttpEroor = require('../../lib/middleware/error');

const bearerToken  = (req, res, next) => {
    const token  = req.get('Authorization')
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
            }
            else {
                next(new HttpEroor(401, 'No Token Found'));
            }
        })
        .catch(next);
};



module.exports = { ensureAuth, bearerToken }; 