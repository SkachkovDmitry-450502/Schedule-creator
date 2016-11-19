var mysql = require('mysql');
var async = require('async');
var db = require('./db');


import DB from './db';

const getObjectsSQL = 'SELECT object.* FROM object ' +
    'INNER JOIN schedule USING(idSchedule) ' +
    'INNER JOIN user USING(idUser) ' +
    'WHERE user.email = ? AND schedule.name = ?';
const getSQL = 'SELECT object.* FROM object ' +
    'INNER JOIN schedule USING (idSchedule) ' +
    'INNER JOIN user USING (idUser) ' +
    'WHERE user.email = ? AND schedule.name = ? AND object.name = ?';
const insertSQL = 'INSERT INTO object (idSchedule, name, count) ' +
    'VALUES ((SELECT idSchedule FROM schedule ' +
    'INNER JOIN user USING (idUser) ' +
    'WHERE user.email = ? AND schedule.name = ?), ?, ?)';
const deleteSQL = 'DELETE FROM object WHERE idObject = ?';

export default class ObjectDB extends DB {
    static getObjects(email, scheduleName) {
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(connection => {
                    connection.query(getObjectsSQL, [email, scheduleName], function (error, objects) {
                        connection.release();
                        error ? reject(error) : resolve(objects);
                    });
                })
                .catch(error => reject(error));
        });
    }

    static get(email, scheduleName, name) {
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(connection => {
                    connection.query(getSQL, [email, scheduleName, name], function (error, object) {
                        connection.release();
                        error ? reject(error) : resolve(object[0]);
                    });
                })
                .catch(error => reject(error));
        })
    }

    static insert(object) {
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(connection => {
                    connection.query(insertSQL, [object.email, object.scheduleName, object.name, object.count],
                        function (error, result) {
                            connection.release();
                            error ? reject(error) : resolve(result.insertId);
                        });
                })
                .catch(error => reject(error));
        });
    }

    static delete(object) {
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(connection => {
                    connection.query(deleteSQL, object.idObject, function (error, result) {
                        connection.release();
                        error ? reject(error) : resolve(true);
                    });
                })
                .catch(error => reject(error));
        });
    }
}

