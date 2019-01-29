const { Router } = require('express');
const User = require('../models/User');
const { ensureAuth } = require('../middleware/ensureAuth');


module.exports = Router()

    .post('/signup', (req, res, next) => {
        const { email, password } = req.body;
        User.create({ email, password })
            .then(user => res.send({ user, token: user.authToken()
            }))
            .catch(next);
    })
    .post('/signin', (req, res, next) => {
        const { email, password } = req.body;
        User
            .findOne({ email })
            .then(user => {
                return Promise.all([
                    Promise.resolve(user),
                    user.compare(password)
                ]);
            })
            .then(([user, value]) => {
                if(value) {
                    res.send({ user, token: user.authToken() });
                }
            })
            .catch(next);
    })
    .get('/verify', ensureAuth, (req, res) => {
        res.send(req.user);
    });