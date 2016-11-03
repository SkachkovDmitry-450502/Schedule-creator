var mysql = require('mysql');
var async = require('async');
var db = require('./db');
var schedule = require('./scheduleDB');


exports.getUserByEmail = function (email, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query("SELECT email, password FROM user WHERE email = ?", email,
                function (err, user) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, user[0]);
                    }
                });
        }
    ], callback);
};

exports.insertUser = function (user, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('INSERT INTO user SET ?', user,
                function (err, rows) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, true);
                    }
                });
        }
    ], callback);
};
