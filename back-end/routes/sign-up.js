var express = require('express');
var path = require('path');
var controller = require('../controllers/sign-up');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../front-end/sign-up/sign-up.html'));
});

router.post('/', function (req, res, next) {
    controller.save(req.body, function (err, isSave) {
        if (err){
            next(err);
        } else {
            if (isSave) {
                res.sendStatus(200);
            } else {
                res.sendStatus(302);
            }
        }
    });
});

module.exports = router;

