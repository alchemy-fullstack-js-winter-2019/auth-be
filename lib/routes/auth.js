const { Router } = require('express');
const Users = require('../models/User');
const { HttpError } = require('../../middleware/error');

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
    })
    .post('/signin', (req, res, next) => {
        const { email, password } = req.body;
        console.log('hello', req.body);
        Users.findOne({
            email })
            .then(user => {
                return Promise.all([
                    Promise.resolve(user), user.compare(password)
                ]);
            })
            .then(([user, passwordCorrect]) => {
                if(passwordCorrect) {
                    res.send({ user, token: user.authToken() });
                }
                else next(new HttpError(401, 'Username or Password Invalid'));
            })
            .catch(next);
    });
