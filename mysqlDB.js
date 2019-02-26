var mysql = require('mysql');
/*
var connection = mysql.createConnection({
    host : "192.168.35.67", //우리집
    port : 3306, //mysql db port
    user : "root",
    password: "root",
    database : "kakaocalorie",
    charset: 'utf8'
});
*/
var pool = mysql.createPool({
    host : "192.168.0.29", // 우리집
    port : 3306, //mysql db port
    user : "root",
    password: "root",
    database : "kakaocalorie",
    connectionLimit : 50,
    charset: 'utf8',
    multipleStatements : true // 다중쿼리
});

module.exports = pool;
//module.exports = connection;