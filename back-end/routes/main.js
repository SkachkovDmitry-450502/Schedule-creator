// var express = require('express');
// var path = require('path');
// var controller = require('../controllers/main');
// var router = express.Router();

// router.post('/get-schedules-name', function (req, res, next) {
//     controller.getSchedulesName(req.body.email, function (err, result) {
//         if (err) {
//             next(err);
//         } else {
//             //console.log('schedules name was successful sent');
//             res.send(JSON.stringify(result, function (key, value) {
//                 if (key.slice(0, 2) == 'id') return undefined;
//                 return value;
//             }, 2));
//         }
//     });
// });
//
// router.post('/get-schedule', function (req, res, next) {
//     controller.sendScheduleInformation(req.body.email, req.body.name, function (err, schedule) {
//         if (err) {
//             next(err);
//         } else {
//             res.send(JSON.stringify(schedule, function (key, value) {
//                 if (key.slice(0, 2) == 'id') return undefined;
//                 return value;
//             }, 2));
//         }
//     });
// });
//
// router.post('/save-schedule', function (req, res, next) {
//     controller.saveSchedule(req.body, function (err, isSave) {
//         if (err) {
//             next(err);
//         } else {
//             if (isSave) {
//                 res.sendStatus(200);
//             } else {
//                 res.sendStatus(302);
//             }
//         }
//     });
// });
//
// router.post('/save-day', function (req, res, next) {
//     controller.saveDay(req.body, function (err, isSave) {
//         if (err) {
//             next(err);
//         } else {
//             if (isSave) {
//                 res.sendStatus(200);
//             } else {
//                 res.sendStatus(302);
//             }
//         }
//     });
// });
//
// router.post('/save-key', function (req, res, next) {
//     controller.saveKey(req.body, function (err, isSave) {
//         if(err){
//             next(err);
//         } else {
//             if(isSave) {
//                 res.sendStatus(200);
//             } else {
//                 res.sendStatus(302);
//             }
//         }
//     })
// });
//
// router.post('/save-object', function (req, res, next) {
//     controller.saveObject(req.body, function (err, isSave) {
//         if (err) {
//             next(err);
//         } else {
//             if (isSave) {
//                 res.sendStatus(200);
//             } else {
//                 res.sendStatus(302);
//             }
//         }
//     })
// });
//
// router.post('/delete-schedule', function (req, res, next) {
//     console.log(req.body);
//     controller.deleteSchedule(req.body['email'], req.body['name'], function (err, result) {
//         if(err){
//             next(err);
//         } else {
//             res.sendStatus(200);
//         }
//     });
// });
import ControllerFactory from '../factories/controllersFactory';
import Schedule from '../controllers/schedule';
import Obj from '../controllers/object';
import Property from '../controllers/property';
import Parameter from '../controllers/parameter';
import Day from '../controllers/day';

import path from 'path';
import express from 'express';

const OK_STATUS = 200;
const FORBIDDEN_STATUS = 403;

let router = express.Router();

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../front-end/main/main.html'));
});

router.post('/save', function (req, res, next) {
    ControllerFactory.create(req.body.type)
        .then(controller => {
            controller.save(req.body.info);
        })
        .then(isSaved => {
            isSaved ? res.sendStatus(OK_STATUS) : res.sendStatus(FORBIDDEN_STATUS);
        })
        .catch(error => next(error));
});

router.delete('/delete', function (req, res, next) {
    ControllerFactory.create(req.body.type, req.body.info)
        .then(controller => {
            controller.delete(req.body.info);
        })
        .then(isDeleted => {
            isDeleted ? res.sendStatus(OK_STATUS) : res.sendStatus(FORBIDDEN_STATUS);
        })
        .catch(error => next(error));
});

router.post('/update', function (req, res, next) {
    console.log('hello');
    ControllerFactory.create(req.body.type, req.body.info)
        .then(controller => {
            controller.update(req.body.oldInfo, req.body.newInfo);
        })
        .then(isUpdated => {
            isUpdated ? res.sendStatus(OK_STATUS) : res.sendStatus(FORBIDDEN_STATUS);
        })
        .catch(error => next(error));
});

//TODO maybe get request?
router.post('/get', function (req, res, next) {
    let tmp = {};
    Schedule.get(req.body)
        .then(schedules => {
            tmp = schedules;
            return Promise.all([
                Day.get({email: req.body.email, name:schedules.names[0].name}),
                Parameter.get({email: req.body.email, name:schedules.names[0].name}),
                Obj.get(req.body.email, schedules.names[0].name)
                    .then(objects => Property.get(objects))
            ]);
        })
        .then(result => {
            tmp.schedule.days = result[0];
            tmp.schedule.parameters = result[1];
            tmp.schedule.objects = result[2];
            res.send(tmp);
        })
        .catch(error => next(error));
});

module.exports = router;