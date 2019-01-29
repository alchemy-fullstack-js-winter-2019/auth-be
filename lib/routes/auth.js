const { Router } = require('express');
const Users = require('../models/User');

module.exports = Router()
    .post('/signup', (req, res, next) => {
        const { email, password } = req.body;
        Users.create({
            email,
            password })
            .then(user => {
                res.send({ user, token: user.authToken() });
                  
            })
            .catch(next);
    });
