var mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'schedule',
    password: 'secret',
    database: 'schedule_db'
});

export default class DB{
    constructor(){
        //TODO createPool should execute once at the start
        // this.pool = mysql.createPool({
        //     connectionLimit: 10,
        //     host: 'localhost',
        //     user: 'schedule',
        //     password: 'secret',
        //     database: 'schedule_db'
        // });
    }

    static getConnection(){
        return new Promise((resolve, reject) => {
            pool.getConnection(function (error, connection) {
                error ? reject(error) : resolve(connection);
            });
        })
    }
}
