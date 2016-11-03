var mysql = require('mysql');

exports.pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'schedule',
    password : 'secret',
    database : 'schedule_db'
});
