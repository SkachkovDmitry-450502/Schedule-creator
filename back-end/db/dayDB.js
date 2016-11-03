var mysql = require('mysql');
var async = require('async');
var db = require('./db');

exports.getDaysByEmailAndScheduleName = function (email, scheduleName, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('SELECT day.name, day.duration, day.timetable FROM day ' +
                'INNER JOIN schedule USING(idSchedule) ' +
                'INNER JOIN user USING(idUser) ' +
                'WHERE user.email = ? AND schedule.name = ?', [email, scheduleName],
                function (err, days) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, days);
                    }
                }
            );
        }
    ], callback);
};

exports.getDayByEmailScheduleNameAndName = function (email, scheduleName, name, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('SELECT day.name, day.duration, day.timetable FROM day ' +
                'INNER JOIN schedule USING(idSchedule) ' +
                'INNER JOIN user USING(idUser) ' +
                'WHERE user.email = ? AND schedule.name = ? AND day.name = ?', [email, scheduleName, name],
                function (err, day) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, day);
                    }
                }
            );
        }
    ], callback);
};

//TODO refactor sql request
exports.insertDay = function (day, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('INSERT INTO day (idSchedule, name, duration, timetable) VALUES (' +
                '(SELECT idSchedule FROM schedule ' +
                'INNER JOIN user USING(idUser) ' +
                'WHERE user.email = ? AND schedule.name = ?), ' +
                '?, ?, ?)', [day['email'], day['scheduleName'], day['name'], day['duration'], day['timetable']],
                function (err, day) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, true);
                    }
                });
        }
    ], callback)
};