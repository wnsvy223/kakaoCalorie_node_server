var express = require('express');
var router = express.Router();
var mysqlDB = require('../mysqlDB');

router.post('/', function (req, res, next) {
    var userEmail = req.body['userEmail'];
    var stepCount = req.body['stepCount'];
    var distance = req.body['distance'];
    var calorie = req.body['calorie'];
    
    const createTable = 'create table footstep(userEmail varchar(30) primary key, footstep varchar(100), distance varchar(100), calorie varchar(100));'

    mysqlDB.getConnection(function(err, connection){
       if(err){
            console.log('connection pool error'+err);
       }else{
            connection.query('show tables in kakaocalorie like \'footstep\'',function (err, rows, fields){
                if(!err){
                    if(rows[0] == undefined){ // footstep 테이블이 없으면 테이블 생성
                        connection.query(createTable,function(err,rows,fields){
                            console.log('신규 테이블 생성' + JSON.stringify(rows));
                        });
                    }
                    connection.query('replace into footstep values(?,?,?,?)',[userEmail,stepCount,distance,calorie],function(err,rows,fields){
                        if(!err){
                            console.log('테이블(footstep) 데이터 삽입 성공 - ' +'userEmail:'+ userEmail + 'stepCount:'+stepCount + 'distance' + distance + 'calorie' + calorie);
                            res.send(rows);
                        }else{
                            console.log('테이블(footstep) 데이터 삽입 에러'+err);
                            res.send('count set Error : ' + err);
                        }
                    });
                  
                }else{
                    connection.release();
                    console.log('query error'+err);
                    res.send('Select Error : ' + err);
                }
                connection.release();
            });
        }
   });
   
});

module.exports = router;