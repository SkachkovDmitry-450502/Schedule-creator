'use strict';

var _controllersFactory = require('../factories/controllersFactory');

var _controllersFactory2 = _interopRequireDefault(_controllersFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../front-end/login/login.html'));
});

router.post('/', function (req, res, next) {
    new Promise(function (resolve, reject) {
        _controllersFactory2.default.create('user', req.body).then(function (controller) {
            return controller.login();
        }).then(function (isLogin) {
            isLogin ? res.sendStatus(200) : res.sendStatus(304);
        }).catch(function (error) {
            next(error);
        });
    });
});

module.exports = router;

//# sourceMappingURL=login-compiled.js.map