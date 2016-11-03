var mysql = require('mysql');
var async = require('async');
var db = require('./db');

exports.getSchedulesByEmail = function (email, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('SELECT schedule.name FROM schedule INNER JOIN user USING(idUser) WHERE email = ?', email,
                function (err, schedule) {
                    if (err){
                        callback(err);
                    } else {
                        connection.release();
                        callback(null, schedule);
                    }
                });
        }
    ], callback);
};

exports.getScheduleByEmailAndName = function (email, name, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query("SELECT * FROM schedule " +
                "INNER JOIN user USING(idUser) " +
                "WHERE user.email = ? AND schedule.name = ?", [email, name],
                function (err, schedule) {
                    if (err) {
                        callback(err);
                    } else {
                        connection.release();
                        callback(null, schedule[0]);
                    }
                });
        }
    ], callback);
};

exports.insertSchedule = function (schedule, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('INSERT INTO schedule (idUser, name) ' +
                'VALUES ((SELECT idUser FROM user WHERE user.email = ?), ?)', [schedule['email'], schedule['name']],
                function (err, result) {
                    if (err){
                        callback(err);
                    } else {
                        connection.release();
                        callback(null, true);
                    }
                });
        }
    ], callback);
};



