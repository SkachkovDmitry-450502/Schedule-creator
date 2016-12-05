import DB from './db';

const getSQL = 'SELECT email, password FROM user WHERE email = ?';
const insertSQL = 'INSERT INTO user SET ?';

export default class UserDB extends DB {

    static get(email) {
        return new Promise((resolve, reject) => {
            let request = {
                sql: getSQL,
                array: email
            };

            this.getFromDatabase(request)
                .then(
                    user => resolve(user[0]),
                    error => reject(error));
        });
    }

    static insert(info) {
        return new Promise((resolve, reject) => {
            let request = {
                sql: insertSQL,
                array: info
            };

            this.getFromDatabase(request)
                .then(
                    result => resolve(result.insertId),
                    error => reject(error));
        });
    }
}