'use strict';

var _controllersFactory = require('../factories/controllersFactory');

var _controllersFactory2 = _interopRequireDefault(_controllersFactory);

var _schedule = require('../controllers/schedule');

var _schedule2 = _interopRequireDefault(_schedule);

var _object = require('../controllers/object');

var _object2 = _interopRequireDefault(_object);

var _property = require('../controllers/property');

var _property2 = _interopRequireDefault(_property);

var _parameter = require('../controllers/parameter');

var _parameter2 = _interopRequireDefault(_parameter);

var _day = require('../controllers/day');

var _day2 = _interopRequireDefault(_day);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var OK_STATUS = 200;
var FORBIDDEN_STATUS = 403;

var router = _express2.default.Router();

router.get('/', function (req, res, next) {
    res.sendFile(_path2.default.resolve(__dirname, '../../front-end/main/main.html'));
});

router.post('/save', function (req, res, next) {
    _controllersFactory2.default.create(req.body.type).then(function (controller) {
        controller.save(req.body.info);
    }).then(function (isSaved) {
        isSaved ? res.sendStatus(OK_STATUS) : res.sendStatus(FORBIDDEN_STATUS);
    }).catch(function (error) {
        return next(error);
    });
});

router.delete('/delete', function (req, res, next) {
    _controllersFactory2.default.create(req.body.type, req.body.info).then(function (controller) {
        controller.delete(req.body.info);
    }).then(function (isDeleted) {
        isDeleted ? res.sendStatus(OK_STATUS) : res.sendStatus(FORBIDDEN_STATUS);
    }).catch(function (error) {
        return next(error);
    });
});

router.post('/update', function (req, res, next) {
    _controllersFactory2.default.create(req.body.type, req.body.info).then(function (controller) {
        controller.update(req.body.oldInfo, req.body.newInfo);
    }).then(function (isUpdated) {
        isUpdated ? res.sendStatus(OK_STATUS) : res.sendStatus(FORBIDDEN_STATUS);
    }).catch(function (error) {
        return next(error);
    });
});

//TODO maybe get request?
router.post('/get', function (req, res, next) {
    var tmp = {};
    _schedule2.default.get(req.body).then(function (schedules) {
        tmp = schedules;
        return Promise.all([_day2.default.get(schedules[0]), _parameter2.default.get(schedules[0]), _object2.default.get(schedules[0]).then(function (objects) {
            return _property2.default.get(objects);
        })]);
    }).then(function (result) {
        tmp.schedule.days = result[0];
        tmp.schedule.parameters = result[1];
        tmp.schedule.objects = result[2];
    }).catch(function (error) {
        return next(error);
    });
});

module.exports = router;

//# sourceMappingURL=main-compiled.js.map