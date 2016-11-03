var async = require('async');
var debug = require('debug');
var scheduleDB = require('../db/scheduleDB');
var dayDB = require('../db/dayDB');
var objectDB = require('../db/objectDB');
var parameterDB = require('../db/parameterDB');

/* GET SCHEDULES FUNCTIONS */

exports.getSchedules = function (email, callback) {
    async.waterfall([
        function (callback) {
            scheduleDB.getSchedulesByEmail(email, callback);
        },
        function (schedule, callback) {
            async.each(schedule, function (info, callback) {
                getScheduleInformation(info, callback);
            }, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, schedule);
                }
            });
        }
    ], callback);
};

function getScheduleInformation(schedule, callback) {
    async.parallel([
        function (callback) {
            addObjectInfoToSchedule(schedule, callback)
        },
        function (callback) {
            addDayInfoToSchedule(schedule, callback);
        }
    ], callback);
}

function addDayInfoToSchedule(schedule, callback) {
    async.waterfall([
        function (callback) {
            dayDB.getDaysByEmailAndScheduleName(schedule['email'], schedule['name'], callback);
        },
        function (days, callback) {
            schedule['days'] = days;
            callback(null, true);
        }
    ], callback);
}

function addObjectInfoToSchedule(schedule, callback) {
    async.waterfall([
        function (callback) {
            getObjectsInfo(schedule['name'], callback);
        },
        function (object, callback) {
            schedule['objects'] = object;
            callback(null, true);
        }
    ], callback);
}

function getObjectsInfo(scheduleName, callback) {
    async.waterfall([
        function (callback) {
            objectDB.getObjects(scheduleName, callback);
        },
        function (object, callback) {
            addParametersInfoToObject(object, callback)
        }
    ], callback);
}

function addParametersInfoToObject(object, callback) {
    async.each(object, function (info, callback) {
        async.waterfall([
            function (callback) {
                getParameter(info['idObject'], callback);
            },
            function (parameter, callback) {
                info['parameter'] = parameter;
                callback();
            }
        ], callback);
    }, function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, object);
        }
    });
}

function getParameter(idObject, callback) {
    async.waterfall([
        function (callback) {
            parameterDB.getParametersByIdObject(idObject, callback);
        },
        function (parameter, callback) {
            transformToObject(parameter, callback);
        }
    ], callback);
}

function transformToObject(parameter, callback) {
    var array = [];
    async.each(parameter, function (info, callback) {
            array.push(info.name);
            callback();
        },
        function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, array);
            }
        }
    );
}

/* SAVE SCHEDULE FUNCTIONS */

exports.saveSchedule = function (schedule, callback) {
    async.waterfall([
        function (callback) {
            checkScheduleExist(schedule['email'], schedule['name'], callback);
        },
        function (isExist, callback) {
            if (isExist) {
                callback(null, false)
            } else {
                //TODO think about other parameters. For example (email, name)
                scheduleDB.insertSchedule(schedule, callback);
            }
        }
    ], callback);
};

function checkScheduleExist(email, name, callback) {
    async.waterfall([
        function (callback) {
            scheduleDB.getScheduleByEmailAndName(email, name, callback);
        },
        function (schedule, callback) {
            if (schedule) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        }
    ], callback);
}

/* SAVE DAYS FUNCTIONS */

exports.saveDay = function (day, callback) {
    async.waterfall([
        function (callback) {
            checkDayExist(day['email'], day['scheduleName'], day['name'], callback);
        },
        function (isExist, callback) {
            if (isExist) {
                callback(null, false);
            } else {
                dayDB.insertDay(day, callback);
            }
        }
    ], callback);
};

function checkDayExist(email, scheduleName, name, callback) {
    async.waterfall([
        function (callback) {
            dayDB.getDayByEmailScheduleNameAndName(email, scheduleName, name, callback);
        },
        function (day, callback) {
            if (day.length > 0) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        }
    ], callback);
}

/* SAVE OBJECT FUNCTIONS */

exports.saveObject = function (object, callback) {
    async.waterfall([
        function (callback) {
            objectDB.getObjectsByName(object['email'], object['scheduleName'], object['name']);
        },
        function (scheduleObjects, callback) {
            if (scheduleObjects.length > 0) {
                checkPresenceOfObject(scheduleObjects, object, callback);
            } else {
                callback(null, true);
            }
        },
        function (isEqualParameters, callback) {
            if(isEqualParameters){
                callback(null, false);
            } else {
                callback(null, true);
                //objectDB.insertObject(object, callback);
            }
        }
    ], callback);
};

function checkPresenceOfObject(scheduleObjects, object, callback) {
    // async.each(scheduleObjects, function (info, callback) {
    //     async.waterfall([
    //         function (callback) {
    //             checkEqualParameters(info['parameters'], object['parameters'], callback);
    //         },
    //         function (isEqual, callback) {
    //             if(isEqual){
    //                 finalCallback(null, false);
    //             } else {
    //                 callback();
    //             }
    //         }
    //     ], callback)
    // }, finalCallback);
    async.some(scheduleObjects, function (info, callback) {
        checkEqualParameters(info['parameters'], object['parameters'], callback);
    }, callback)
}

function checkEqualParameters(first, second, callback) {
    async.every(first, function (firstParameter, callback) {
        async.some(second, function (secondParameter, callback) {
            var firstParameterKeys = Object.keys(firstParameter);
            async.every(firstParameterKeys, function (key, callback) {
                callback(null, secondParameter[key] && firstParameter[key] == secondParameter[key]);
            });
            callback(null, firstParameter == secondParameter);
        }, callback);
    });
}