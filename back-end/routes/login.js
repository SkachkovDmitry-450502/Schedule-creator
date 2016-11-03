var express = require('express');
var path = require('path');
var controller = require('../controllers/login');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../front-end/login/login.html'));
});

router.post('/', function (req, res, next) {
    controller.login(req.body['email'], req.body['password'], function (err, isLogin) {
        if (err){
            console.log(err.message);
            next(err);
        } else {
            if (isLogin) {
                res.sendStatus(200);
            } else {
                res.sendStatus(403);
            }
        }
    });
});

module.exports = router;
