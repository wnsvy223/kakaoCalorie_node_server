var express = require('express');
var router = express.Router();
var mysqlDB = require('../mysqlDB');

const sql = 'select user.*,footstep.footstep, footstep.distance from user inner join footstep on user.userEmail=footstep.userEmail where footstep.userEmail=?';
// Android로부터 온 get요청의 url에 담긴 userEmail의 값에 해당하는 유저의 user,footstep 테이블 데이터 병합조회

router.get('/getUser',function(req,res,next){
    mysqlDB.getConnection(function(err, connection){
        if(err){
            console.log('connection pool error'+err);
        }else{
            connection.query(sql,[req.query.userEmail],function(err,rows,fields){
                console.log('커플유저:'+ req.query.userEmail + '조회' + JSON.stringify(rows));
                res.send(rows);
            });
        } 
    });
});

module.exports = router;