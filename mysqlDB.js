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
    //multipleStatements : true 
    // 다중쿼리 가능하게 해주는 옵션 => 다중쿼리 옵션을 켤경우 sql 인젝션 공격을 가능해짐. 방어수단을 따로 두지 않는 이상 true옵션 위험.
});

module.exports = pool;
//module.exports = connection;