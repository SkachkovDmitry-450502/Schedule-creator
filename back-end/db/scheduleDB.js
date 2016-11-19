//var mysql = require('mysql');
import {mysql} from 'mysql'
import DB from './db';

const getNamesSQL = 'SELECT schedule.name FROM schedule ' +
    'INNER JOIN user USING(idUser) ' +
    'WHERE user.email = ?';
const getSQL = 'SELECT schedule.* FROM schedule ' +
    'INNER JOIN user USING(idUser) ' +
    'WHERE user.email = ? AND schedule.name = ?';
const insertSQL = 'INSERT INTO schedule (idUser, name) ' +
    'VALUES ((SELECT idUser FROM user WHERE user.email = ?), ?)';
const deleteSQL = 'DELETE schedule FROM schedule ' +
    'INNER JOIN user USING (idUser) ' +
    'WHERE user.email = ? AND schedule.name = ?';

export default class ScheduleDB extends DB {
    static getNames(email) {
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(connection => {
                    connection.query(getNamesSQL, email, function (error, schedules) {
                        connection.release();
                        error ? reject(error) : resolve(schedules);
                    });
                })
                .catch(error => reject(error));
        });
    }

    static get(email, name) {
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(connection => {
                    connection.query(getSQL, [email, name], function (error, schedule) {
                        connection.release();
                        error ? reject(error) : resolve(schedule[0]);
                    });
                })
                .catch(error => reject(error));
        });
    }

    static insert(schedule) {
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(connection => {
                    connection.query(insertSQL, [schedule.email, schedule.name], function (error, result) {
                        connection.release();
                        error ? reject(error) : resolve(result.insertId);
                    });
                })
                .catch(error => reject(error));
        });
    }

    static delete(email, name) {
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(connection => {
                    connection.query(deleteSQL, [email, name], function (error, result) {
                        connection.release();
                        error ? reject(error) : resolve(true);
                    });
                })
                .catch(error => reject(error));
        });
    }
}


