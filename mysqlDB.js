var mysql = require('mysql');
/*
var connection = mysql.createConnection({
    host : "192.168.35.67", //우리집
    //host : "192.168.0.11", //승진이집
    port : 3306, //mysql db port
    user : "root",
    password: "root",
    database : "kakaocalorie",
    charset: 'utf8'
});
*/
var pool = mysql.createPool({
    host : "192.168.0.29", // 우리집
    //host : "192.168.0.11", //승진이집
    //host : "175.119.217.23", // 성남집 공인IP
    port : 3306, //mysql db port
    user : "root",
    password: "root",
    database : "kakaocalorie",
    connectionLimit : 50,
    charset: 'utf8'
});

module.exports = pool;
//module.exports = connection;