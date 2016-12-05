import DB from './db';

const getObjectsSQL = 'SELECT object.* FROM object ' +
    'INNER JOIN schedule USING(idSchedule) ' +
    'INNER JOIN user USING(idUser) ' +
    'WHERE user.email = ? AND schedule.name = ?';
const getSQL = 'SELECT object.* FROM object ' +
    'INNER JOIN schedule USING (idSchedule) ' +
    'INNER JOIN user USING (idUser) ' +
    'WHERE user.email = ? AND schedule.name = ? AND object.name = ?';
const insertSQL = 'INSERT INTO object (idSchedule, name, count, duration) ' +
    'VALUES ((SELECT idSchedule FROM schedule ' +
    'INNER JOIN user USING (idUser) ' +
    'WHERE user.email = ? AND schedule.name = ?), ?, ?, ?)';
const deleteSQL = 'DELETE FROM object WHERE idObject = ?';

export default class ObjectDB extends DB {
    static get(email, scheduleName) {
        let request = {
            sql: getObjectsSQL,
            array: [email, scheduleName]
        };

        return this.getFromDatabase(request);
    }

    static getByName(info) {
        let request = {
            sql: getSQL,
            array: [info.email, info.scheduleName, info.name]
        };

        return this.getFromDatabase(request);
    }

    static insert(info) {
        return new Promise((resolve, reject) => {
            let request = {
                sql: insertSQL,
                array: [info.email, info.scheduleName, info.name, info.count, info.duration]
            };

            this.getFromDatabase(request)
                .then(
                    result => resolve(result.insertId),
                    error => reject(error));
        });
    }

    static delete(idObject) {
        let request = {
            sql: deleteSQL,
            array: idObject
        };

        return this.getFromDatabase(request);
    }
}

