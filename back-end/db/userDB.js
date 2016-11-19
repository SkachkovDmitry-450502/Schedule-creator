var mysql = require('mysql');

import DB from './db';

const getSQL = 'SELECT email, password FROM user WHERE email = ?';
const insertSQL = 'INSERT INTO user SET ?';

export default class UserDB extends DB{

    static get(email) {
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(
                    connection => {
                        connection.query(getSQL, email, function (err, user) {
                            connection.release();
                            err ? reject(err) : resolve(user[0]);
                        });
                    },
                    error => reject(error));
        });
    }

    static insert() {
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(
                    connection => {
                        connection.query(insertSQL, this.user, function (err, result) {
                            connection.release();
                            err ? reject(err) : resolve(result.insertId);
                        })
                    },
                    error => reject(error));
        });
    }
}