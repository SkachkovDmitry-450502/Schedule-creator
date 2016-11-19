var express = require('express');
var path = require('path');
var router = express.Router();

import {controllersFactory} from '../factories/controllersFactory';

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../front-end/sign-up/sign-up.html'));
});

router.post('/', function (req, res, next) {
    new Promise((resolve, reject) => {
        resolve(controllersFactory.create('user', req.body));
    })
        .then(user => {
            return user.save();
        })
        .then(isSave => {
            isSave ? res.sendStatus(200) : res.sendStatus(302);
        })
        .catch(error => {
            next(error);
        });
});
module.exports = router;

