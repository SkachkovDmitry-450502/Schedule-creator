var mysql = require('mysql');
var async = require('async');
var db = require('./db');

exports.getObjects = function (email, scheduleName, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('SELECT * FROM object ' +
                'INNER JOIN schedule USING(idSchedule) ' +
                'INNER JOIN user USING(idUser) ' +
                'WHERE user.email = ? AND schedule.name = ?', [email, scheduleName],
                function (err, objects) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, objects);
                    }
                });
        }
    ], callback);
};

exports.getObjectsByName = function (email, scheduleName, name, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('SELECT * FROM object ' +
                'INNER JOIN schedule USING (idSchedule) ' +
                'INNER JOIN user USING (idUser) ' +
                'WHERE user.email = ? AND schedule.name = ? AND object.name = ?', [email, scheduleName, name],
                function (err, objects) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, objects);
                    }
                });
        }
    ], callback)
};

exports.insertObject = function (object, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('INSERT INTO object SET ?', object, function (err, result) {
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
