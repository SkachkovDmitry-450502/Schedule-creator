var mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'schedule',
    password: 'secret',
    database: 'schedule_db'
});

export default class DB{

    static getConnection(){
        return new Promise((resolve, reject) => {
            pool.getConnection(function (error, connection) {
                error ? reject(error) : resolve(connection);
            });
        })
    }

    static getFromDatabase(request) {
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(connection => {
                    connection.query(request.sql, request.array, function (error, result) {
                        connection.release();
                        error ? reject(error) : resolve(result);
                    });
                })
                .catch(error => reject(error));
        });
    }
}
