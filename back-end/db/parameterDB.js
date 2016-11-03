var mysql = require('mysql');
var async = require('async');
var db = require('./db');

exports.getParametersByIdObject = function (idObject, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('SELECT name, value FROM parameter WHERE idObject = ?', idObject,
                function (err, parameters) {
                    if (err) {
                        callback(err);
                    } else {
                        connection.release();
                        callback(null, parameters);
                    }
                });
        }
    ], callback);
};

exports.getParametersByIdScheduleAndObjectName = function (idSchedule, objectName, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('SELECT parameter.name, parameter.value FROM parameter ' +
                'INNER JOIN object USING(idObject)' +
                'INNER JOIN schedule USING(idSchedule)' +
                'WHERE schedule.idSchedule = ? AND object.name = ?', [idSchedule, objectName],
                function (err, parameters) {
                    connection.release();
                    if (err) {
                        callback(err)
                    } else {
                        callback(null, parameters);
                    }
                });
        }
    ]);
};