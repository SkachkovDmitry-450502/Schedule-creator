var mysql = require('mysql');
var async = require('async');
var db = require('./db');
var objectDB = require('./objectDB');

import DB from './db';

const getSQL = 'SELECT parameter_keys.name, parameter.value FROM parameter ' +
    'INNER JOIN parameter_keys USING (idKey) ' +
    'WHERE idObject = ?';

export default class PropertyDB extends DB {

    static get(idObject) {
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(connection => {
                    connection.query(getSQL, idObject, function (error, parameters) {
                        connection.release();
                        error ? reject(error) : resolve(parameters);
                    });
                })
                .catch(error => reject(error));
        });
    }

    save(info){
        return new Promise((resolve, reject) => {
        })

    }
}

// exports.get = function (idObject, callback) {
//     async.waterfall([
//         function (callback) {
//             db.pool.getConnection(callback);
//         },
//         function (connection, callback) {
//             connection.query('SELECT parameter_keys.name, parameter.value FROM parameter ' +
//                 'INNER JOIN parameter_keys USING (idKey) ' +
//                 'WHERE idObject = ?', idObject,
//                 function (err, parameters) {
//                     connection.release();
//                     if (err) {
//                         callback(err);
//                     } else {
//                         callback(null, parameters);
//                     }
//                 });
//         }
//     ], callback);
// };

exports.insert = function (idObject, value, key, callback) {
    async.waterfall([
        function (callback) {
            console.log(1);
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            console.log(2);
            connection.query('INSERT INTO parameter (idObject, idKey, value)' +
                'VALUES (?, (SELECT idKey FROM parameter_keys ' +
                'INNER JOIN schedule USING (idSchedule) ' +
                'WHERE schedule.idSchedule = (SELECT idSchedule FROM object WHERE idObject = ?) AND parameter_keys.name = ?), ?)',
                [idObject, idObject, key, value],
                function (err, result) {
                    connection.release();
                    if (err) {
                        objectDB.deleteById(idObject, function (deleteErr, result) {
                            if (deleteErr) {
                                err.message += '\n' + deleteErr.message;
                                callback(err);
                            } else {
                                callback(err);
                            }
                        });
                    } else {
                        callback(null, true);
                    }
                });
        }
    ], callback);
};

exports.delete = function (parameter, callback) {
    async.waterfall([
        function (callback) {
            db.pool.getConnection(callback);
        },
        function (connection, callback) {
            connection.query('DELETE ')
        }
    ])
};