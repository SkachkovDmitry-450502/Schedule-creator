var express = require('express');
var path = require('path');
var router = express.Router();

import ControllersFactory from '../factories/controllersFactory';

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../front-end/login/login.html'));
});

router.post('/', function (req, res, next) {
    console.log('login');
    new Promise((resolve, reject) => {
        ControllersFactory.create('user', req.body)
            .then(controller => {
                return controller.login();
            })
            .then(isLogin => {
                isLogin ? res.sendStatus(200) : res.sendStatus(304);
            })
            .catch(error => {
                next(error);
            });
    })
});

module.exports = router;
