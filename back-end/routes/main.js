var express = require('express');
var path = require('path');
var controller = require('../controllers/main');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../front-end/main/main.html'));
});

router.post('/get-schedule', function (req, res, next) {
    controller.getSchedules(req.body.email, function (err, result) {
        if (err) next(err);
        console.log('schedules was successful sent');
        res.send(JSON.stringify(result, function (key, value) {
            if (key.slice(0, 2) == 'id') return undefined;
            return value;
        }, 2));
    });
});

router.post('/save-schedule', function (req, res, next) {
    controller.saveSchedule(req.body, function (err, isSave) {
        if (err){
            next(err);
        } else {
            if (isSave) {
                console.log('schedule was successful added!');
                res.sendStatus(200);
            } else {
                console.log('schedule with this name is already exist!');
                res.sendStatus(302);
            }
        }
    });
});

router.post('/save-day', function (req, res, next) {
    controller.saveDay(req.body, function (err, isSave) {
        if(err){
            next(err);
        } else {
            if (isSave) {
                console.log('day was successful added!');
                res.sendStatus(200);
            } else {
                console.log('day with this name is already exist!');
                res.sendStatus(302);
            }
        }
    });
});

router.post('/save-object', function (req, res, next) {
    controller.saveObject(req.body, function (err, isSave) {
        if (err){
            next(err);
        } else {
            if (isSave) {
                console.log('object was successful added!');
                res.sendStatus(200);
            } else {
                console.log('object with this name and type is already exist!');
                res.sendStatus(302);
            }
        }
    })
});

router.delete('/delete-object', function (req, res, next) {
   contro
});

module.exports = router;