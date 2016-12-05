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
        console.log(email);
        let request = {
            sql: getNamesSQL,
            array: email
        };

        return this.getFromDatabase(request);
    }

    static get(email, name) {
        return new Promise((resolve, reject) => {
            let request = {
                sql: getSQL,
                array: [email, name]
            };

            this.getFromDatabase(request)
                .then(
                    schedule => resolve(schedule[0]),
                    error => reject(error));
        });
    }

    static insert(schedule) {
        return new Promise((resolve, reject) => {
            let request = {
                sql: insertSQL,
                array: [schedule.email, schedule.name]
            };

            this.getFromDatabase(request)
                .then(
                    result => resolve(result.insertId),
                    error => reject(error));
        });
    }

    static delete(info) {
        console.log(info);
        let request = {
            sql: deleteSQL,
            array: [info.email, info.name]
        };

        return this.getFromDatabase(request);
    }
}


