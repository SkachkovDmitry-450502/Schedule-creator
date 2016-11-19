'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var async = require('async');
var debug = require('debug');
var scheduleDB = require('../db/scheduleDB');
var dayDB = require('../db/dayDB');
var keyDB = require('../db/parameterDB');
var objectDB = require('../db/objectDB');
var parameterDB = require('../db/propertyDB');

/* GET FUNCTIONS */

var Schedule = function Schedule(schedule) {
    _classCallCheck(this, Schedule);
};

exports.getSchedulesName = function (email, callback) {
    async.waterfall([function (callback) {
        scheduleDB.getSchedulesByEmail(email, callback);
    }, function (schedules, callback) {
        console.log(schedules);
        async.map(schedules, function (info, callback) {
            callback(null, info['name']);
        }, callback);
    }], callback);
};

/* GET SCHEDULE INFORMATION */

exports.sendScheduleInformation = function (email, name, callback) {
    async.parallel({
        objects: async.apply(getObjectsInfo, email, name),
        days: async.apply(dayDB.get, email, name),
        keys: async.apply(getKeys, email, name)
    }, callback);
};

function getKeys(email, name, callback) {
    async.waterfall([async.apply(keyDB.get, email, name), function (keys, callback) {
        async.map(keys, function (info, callback) {
            callback(null, info['name']);
        }, callback);
    }], callback);
}

function getObjectsInfo(email, scheduleName, callback) {
    async.waterfall([async.apply(objectDB.get, email, scheduleName), addParametersInformation], callback);
}

function addParametersInformation(objects, callback) {
    async.map(objects, function (info, callback) {
        async.waterfall([async.apply(getParameter, info['idObject']), function (parameters, callback) {
            info['parameters'] = parameters;
            callback(null, info);
        }], callback);
    }, callback);
}

function getParameter(idObject, callback) {
    async.waterfall([async.apply(parameterDB.get, idObject), function (parameters, callback) {
        var obj = {};
        async.each(parameters, function (info, callback) {
            obj[info['name']] = info['value'];
            callback();
        }, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, obj);
            }
        });
    }], callback);
}

/* SAVE SCHEDULE FUNCTIONS */

exports.saveSchedule = function (schedule, callback) {
    async.waterfall([async.apply(checkScheduleExist, schedule['email'], schedule['name']), function (isExist, callback) {
        if (isExist) {
            callback(null, false);
        } else {
            //TODO think about other parameters. For example (email, name)
            scheduleDB.insertSchedule(schedule, callback);
        }
    }], callback);
};

function checkScheduleExist(email, name, callback) {
    async.waterfall([async.apply(scheduleDB.getScheduleByEmailAndName, email, name), function (schedule, callback) {
        callback(null, !!schedule);
    }], callback);
}

/* SAVE DAYS FUNCTIONS */

exports.saveDay = function (day, callback) {
    async.waterfall([async.apply(checkDayExist, day['email'], day['scheduleName'], day['name']), function (isExist, callback) {
        if (isExist) {
            callback(null, false);
        } else {
            dayDB.insert(day, callback);
        }
    }], callback);
};

function checkDayExist(email, scheduleName, name, callback) {
    async.waterfall([async.apply(dayDB.getByName, email, scheduleName, name), function (day, callback) {
        callback(null, day.length > 0);
    }], callback);
}

/* SAVE KEY FUNCTIONS */

exports.saveKey = function (key, saveKeyCallback) {
    async.waterfall([async.apply(checkKeyExist, key), function (isExist, callback) {
        if (isExist) {
            callback(null, false);
        } else {
            keyDB.insert(key, callback);
        }
    }], saveKeyCallback);
};

function checkKeyExist(key, callback) {
    async.waterfall([async.apply(keyDB.getByName, key['email'], key['scheduleName'], key['name']), function (key, callback) {
        callback(null, !!key);
    }], callback);
}

/* SAVE OBJECT FUNCTIONS */

exports.saveObject = function (object, saveObjectCallback) {
    async.waterfall([async.apply(objectDB.getByName, object['email'], object['scheduleName'], object['name']), addParametersInformation, function (scheduleObjects, callback) {
        if (scheduleObjects.length > 0) {
            checkEqualParameters(scheduleObjects, object, callback);
        } else {
            callback(null, false);
        }
    }, function (isEqualParameters, callback) {
        if (isEqualParameters) {
            callback(null, false);
        } else {
            async.waterfall([async.apply(objectDB.insert, object), async.apply(saveParameters, object['parameters'])], callback);
        }
    }], saveObjectCallback);
};

function saveParameters(parameters, idObject, callback) {
    console.log(idObject, parameters);
    async.eachOf(parameters, function (value, key, callback) {
        console.log(idObject, value, key);
        parameterDB.insert(idObject, value, key, callback);
    }, function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, true);
        }
    });
}

//TODO check various length of parameters!
function checkEqualParameters(scheduleObjects, object, callback) {
    var keys = Object.keys(object['parameters']);
    async.some(scheduleObjects, function (info, callback) {
        async.every(keys, function (key, callback) {
            // as a result return 'true' if parameter is exist and 'false' if not
            callback(null, info['parameters'][key] && info['parameters'][key] == object['parameters'][key]);
        }, callback);
    }, callback);
}

/* DELETE SCHEDULE INFORMATION */

exports.deleteSchedule = function (email, name, callback) {
    scheduleDB.deleteSchedule(email, name, callback);
};

/* DELETE OBJECT INFORMATION */

exports.deleteObject = function (object, callback) {
    objectDB.deleteObject(object, callback);
};

/* DELETE PARAMETER INFORMATION */

exports.deleteParameter = function (parameter, callback) {};

//# sourceMappingURL=main-compiled.js.map