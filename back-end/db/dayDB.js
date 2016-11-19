var mysql = require('mysql');
var async = require('async');
var db = require('./db');

import DB from './db';

const getSQL = 'SELECT day.name, day.duration, day.timetable FROM day ' +
    'INNER JOIN schedule USING(idSchedule) ' +
    'INNER JOIN user USING(idUser) ' +
    'WHERE user.email = ? AND schedule.name = ?';

export default class DayDB extends DB{

    static get(info){
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(connection => {
                    connection.query(getSQL, [info.email, info.name], function (error, days) {
                        connection.release();
                        error ? reject(error) : resolve(days);
                    });
                })
                .catch(error => reject(error));
        });
    }
}

// exports.get = function (email, scheduleName, callback) {
//     async.waterfall([
//         function (callback) {
//             db.pool.getConnection(callback);
//         },
//         function (connection, callback) {
//             connection.query('SELECT day.name, day.duration, day.timetable FROM day ' +
//                 'INNER JOIN schedule USING(idSchedule) ' +
//                 'INNER JOIN user USING(idUser) ' +
//                 'WHERE user.email = ? AND schedule.name = ?', [email, scheduleName],
//                 function (err, days) {
//                     connection.release();
//                     if (err) {
//                         callback(err);
//                     } else {
//                         callback(null, days);
//                     }
//                 }
//             );
//         }
//     ], callback);
// };

exports.getByName = function (email, scheduleName, name, callback) {
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
exports.insert = function (day, callback) {
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