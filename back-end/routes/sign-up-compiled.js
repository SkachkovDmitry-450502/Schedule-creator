'use strict';

var _controllersFactory = require('../factories/controllersFactory');

var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../front-end/sign-up/sign-up.html'));
});

router.post('/', function (req, res, next) {
    new Promise(function (resolve, reject) {
        resolve(_controllersFactory.controllersFactory.create('user', req.body));
    }).then(function (user) {
        return user.save();
    }).then(function (isSave) {
        isSave ? res.sendStatus(200) : res.sendStatus(302);
    }).catch(function (error) {
        next(error);
    });
});
module.exports = router;

//# sourceMappingURL=sign-up-compiled.js.map