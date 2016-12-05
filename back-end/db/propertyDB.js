import DB from './db';

const getSQL = 'SELECT parameter_keys.name, parameter.value FROM parameter ' +
    'INNER JOIN parameter_keys USING (idKey) ' +
    'WHERE idObject = ?';
const insertSQL = 'INSERT INTO parameter (idObject, idKey, value)' +
    'VALUES (?, (SELECT idKey FROM parameter_keys ' +
    'INNER JOIN schedule USING (idSchedule) ' +
    'WHERE schedule.idSchedule = (SELECT idSchedule FROM object WHERE idObject = ?) AND parameter_keys.name = ?), ?)';

export default class PropertyDB extends DB {

    static get(idObject) {
        return new Promise((resolve, reject) => {
            let request = {
                sql: getSQL,
                array: idObject
            };

            this.getFromDatabase(request)
                .then(
                    properties => resolve(properties),
                    error => reject(error));
        });
    }

    static insert(info) {
        return new Promise((resolve, reject) => {
            let request = {
                sql: insertSQL,
                array: [info.idObject, info.idObject, info.name, info.value]
            };
            this.getFromDatabase(request)
                .then(
                    result => resolve(result.insertId),
                    error => reject(error));
        });
    }
}

// exports.getByName = function (idObject, callback) {
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