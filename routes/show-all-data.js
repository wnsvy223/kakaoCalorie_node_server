var express = require('express');
var router = express.Router();
var mysqlDB = require('../mysqlDB');

router.get('/', function(req,res,next){
    mysqlDB.getConnection(function(err, connection){
        if(err){
            console.log('connection pool error'+err);
        }else{
            connection.query('select * from user', function(err,rows,fields){
                //connection.end();
                if(!err){
                    console.log(rows);
                    //console.log(fields);
                    var result = 'rows:' + JSON.stringify(rows)+'<br><br>'+'fields:'+JSON.stringify(fields);
                    //res.send(result);
                    res.send(rows);
                }else{
                    console.log('query error'+err);
                    res.send(err);
                }
            });
        }
    });
});

module.exports = router;