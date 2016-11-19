var mysql = require('mysql');
var async = require('async');
var db = require('./db');

exports.get = function (email, scheduleName, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('SELECT parameter_keys.* FROM parameter_keys ' +
                'INNER JOIN schedule USING (idSchedule) ' +
                'INNER JOIN user USING (idUser) ' +
                'WHERE user.email = ? AND schedule.name = ?', [email, scheduleName],
                function (err, keys) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, keys);
                    }
                });
        }
    ], callback);
};

exports.getByName = function (email, scheduleName, name, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('SELECT parameter_keys.* FROM parameter_keys ' +
                'INNER JOIN schedule USING (idSchedule) ' +
                'INNER JOIN user USING (idUser) ' +
                'WHERE user.email = ? AND schedule.name = ? AND parameter_keys.name = ?', [email, scheduleName, name],
                function (err, key) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, key[0]);
                    }
                });
        }
    ], callback);
};

exports.insert = function (key, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('INSERT INTO parameter_keys (idSchedule, name) VALUES (' +
                '(SELECT idSchedule FROM schedule INNER JOIN user USING (idUser) WHERE user.email = ?), ?',
                [key['email'], key['name']],
                function (err, result) {
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

exports.delete = function (key, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('DELETE parameter_keys FROM parameter_keys ' +
                'INNER JOIN schedule USING (idSchedule) ' +
                'INNER JOIN user USING (idUser) ' +
                'WHERE user.email = ? AND schedule.name = ? AND parameter_keys.name = ?',
                [key.email, key.scheduleName, key.name],
            function (err, result) {
                connection.release();
                if(err){
                    callback(err);
                } else {
                    callback(null, true);
                }
            });
        }
    ], callback);
};