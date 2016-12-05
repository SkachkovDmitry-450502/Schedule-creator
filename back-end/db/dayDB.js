import DB from './db';

const getSQL = 'SELECT day.name, day.duration, day.timetable FROM day ' +
    'INNER JOIN schedule USING(idSchedule) ' +
    'INNER JOIN user USING(idUser) ' +
    'WHERE user.email = ? AND schedule.name = ?';
const insertSQL = 'INSERT INTO day (idSchedule, name, duration, timetable) VALUES (' +
    '(SELECT idSchedule FROM schedule ' +
    'INNER JOIN user USING(idUser) ' +
    'WHERE user.email = ? AND schedule.name = ?), ' +
    '?, ?, ?)';
const deleteSQL = 'DELETE day FROM day ' +
    'INNER JOIN schedule USING (idSchedule) ' +
    'INNER JOIN user USING (idUser) ' +
    'WHERE user.email = ? AND schedule.name = ? AND day.name = ?';

export default class DayDB extends DB {

    static get(info) {

        let request = {
            sql: getSQL,
            array: [info.email, info.name]
        };

        return this.getFromDatabase(request);
    }

    static getDay(info) {
        return new Promise((resolve, reject) => {

            let request = {
                sql: getSQL + ' AND day.name = ?',
                array: [info.email, info.scheduleName, info.name]
            };

            this.getFromDatabase(request)
                .then(
                    days => resolve(days[0]),
                    error => reject(error));
        });
    }

    static insert(info) {
        return new Promise((resolve, reject) => {

            let request = {
                sql: insertSQL,
                array: [info.email, info.scheduleName, info.name, info.duration, info.timetable]
            };

            this.getFromDatabase(request)
                .then(
                    result => resolve(result.insertId),
                    error => reject(error));
        });
    }

    static delete(info) {
        return new Promise((resolve, reject) => {
            let request = {
                sql: deleteSQL,
                array: [info.email, info.scheduleName, info.name]
            };

            this.getFromDatabase(request)
                .then(result => {
                    resolve(result);
                })
                .catch(error => reject(error));
        });
    }
}