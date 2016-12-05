import DB from './db';

const getSQL = 'SELECT parameter_keys.name FROM parameter_keys ' +
    'INNER JOIN schedule USING (idSchedule) ' +
    'INNER JOIN user USING (idUser) ' +
    'WHERE user.email = ? AND schedule.name = ?';
const insertSQL = 'INSERT INTO parameter_keys (idSchedule, name) VALUES (' +
    '(SELECT idSchedule FROM schedule INNER JOIN user USING (idUser) WHERE user.email = ? AND schedule.name = ?), ?)';
const deleteSQL = 'DELETE parameter_keys FROM parameter_keys ' +
    'INNER JOIN schedule USING (idSchedule) ' +
    'INNER JOIN user USING (idUser) ' +
    'WHERE user.email = ? AND schedule.name = ? AND parameter_keys.name = ?';
const updateSQL = 'UPDATE parameter_keys ' +
    'INNER JOIN schedule USING (idSchedule) ' +
    'INNER JOIN user USING (idUser) ' +
    'SET parameter_keys.name = ? ' +
    'WHERE user.email = ? AND schedule.name = ? AND parameter_keys.name = ?';

export default class ParameterDB extends DB {

    static get(email, scheduleName) {
        let request = {
            sql: getSQL,
            array: [email, scheduleName]
        };

        return this.getFromDatabase(request)
    }

    static getByName(info) {
        return new Promise((resolve, reject) => {
            let request = {
                sql: getSQL + ' AND parameter_keys.name = ?',
                array: [info.email, info.scheduleName, info.name]
            };

            this.getFromDatabase(request)
                .then(
                    parameter => resolve(parameter[0]),
                    error => reject(error));
        });
    }

    static insert(info) {
        return new Promise((resolve, reject) => {
            let request = {
                sql: insertSQL,
                array: [info.email, info.scheduleName, info.name]
            };

            this.getFromDatabase(request)
                .then(
                    result => resolve(result.insertId),
                    error => reject(error));
        });
    }

    static delete(info) {
        let request = {
            sql: deleteSQL,
            array: [info.email, info.scheduleName, info.name]
        };

        return this.getFromDatabase(request);
    }

    static update(info, newInfo) {
        let request = {
            sql: updateSQL,
            array: [newInfo.name, info.email, info.scheduleName, info.name]
        };

        return this.getFromDatabase(request);
    }
}