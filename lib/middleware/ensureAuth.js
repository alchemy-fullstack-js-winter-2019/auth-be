const User = require('../../lib/models/User');

const bearerToken  = (req, res, next) => {
    const token  = req.get('Authorization')
        .replace(/Bearer\s/i, '');
    req.token = token;
    next();
};

const findAuthToken = (req, res, next) => {
    const token = req.token;
    const yesNo = token.findAuthToken();

    if(yesNo){
        User.findByToken(token)
            .then(user => {
                req.user = user;
            })
            .next();
    }
};



module.exports = { findAuthToken, bearerToken }; 