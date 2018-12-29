var express = require('express');
var router = express.Router();
var mysqlDB = require('../mysqlDB');

router.post('/', function (req, res, next) {
    var userID = req.body['userID'];
    var userEmail = req.body['userEmail'];
    var userPhoto = req.body['userPhoto'];
    var token = req.body['token'];

    mysqlDB.getConnection(function(err, connection){
        if(err){
            console.log('connection pool error'+err);
        }else{
            connection.query('select * from user where userEmail=?',[userEmail], function (err, rows, fields) {
                if (!err) {
                    if (rows[0] == undefined) { // App으로부터 넘어온 userEmail값이 user테이블에 없으면 DB에 insert.
                        connection.query('insert into user values(?,?,?,?)', [userID, userEmail, userPhoto,token], function (err, rows, fields) {
                            if (!err) {
                                res.send(rows);
                                console.log(userID+'님이 가입되었습니다');
                            } else {
                                res.send('Insert Error : ' + err);
                            }    
                        });
                    } else { // 있으면 로그인 메시지 데이터 App에 전달.
                        res.send(rows);
                        console.log(userID+'님이 로그인 하였습니다'); 
                    }
                } else {
                    res.send('Select Error : ' + err);
                }
            });
        }
    });
});

module.exports = router;