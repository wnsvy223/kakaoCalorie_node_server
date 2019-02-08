// user테이블과 footstep테이블을 합쳐서 footstep값에 따라 내림차순 정렬로 조회
// 조회된값을 앱에 보내주고 결과값을 리스트로 출력.

var express = require('express');
var router = express.Router();
var mysqlDB = require('../mysqlDB');
var async = require("async"); // 반복문 비동기 처리를 위한 async 모듈

// 앱에서 카카오톡 친구 token 리스트 전송 -> 노드서버에서 친구리스트를 순회하며 mysql 조건절을 걸어서
// 넘어온 token값을 가진 유저의 user테이블과 footstep테이블의 값을 조회해오기.
router.post('/', function (req, res, next) {

    var friendTokenList = req.body['friendTokenList'];
    var array = new Array();
    array = JSON.parse(friendTokenList); // friendList는 문자열 형태로 넘어왔기때문에 Json형태로 파싱하여 받으면 배열객체를 얻을 수 있음.
    const selectQuery = 'select user.*,footstep.footstep, footstep.distance from user inner join footstep on user.userEmail=footstep.userEmail where token=?';
    // 유저테이블과 스탭테이블을 병합하여 해당 토큰값(유저테이블에 있는)을 가진 유저의 정보를 조회하는 쿼리문

    mysqlDB.getConnection(function(err, connection){
        if(err){
            console.log('connection pool error'+err);
            return callback(err);
        }else{
            var arr = new Array();
            // 앱으로 부터 받아온 토큰값 배열을 mysql에서 토큰값과 같은 유저테이블을 기반으로 footstep테이블을 조회해서 앱에 결과값 전송.
            // async모듈을 사용하여 foreach가 모두 수행된 후 결과값을 앱에 전송
            // 비동기 처리하지 않으면 반복문 로직안에서 res.send()를 할 경우 에러 발생.
            async.forEachOf(array, function(element, i, callback){
                connection.query(selectQuery, element, function(err, rows, fields){
                    if(!err){
                        rows.forEach(function (item) {
                            // 쿼리결과인 rows는 배열이므로 순회해서 JSON Object를 하나씩 결과전송 콜백함수에 쓰일 arr배열에 넣음.
                            arr.push(item);
                            arr.sort(sortArray);
                        });
                        callback();
                    }else{
                        console.log('테이블(footstep) 데이터 삽입 에러'+err);
                    }
                });
            },function(err){
                if(err){
                    callback(err);
                }else{
                    console.log('정렬' + JSON.stringify(arr));
                    callback(null,arr); // 결과값 Json Obj Array를 앱에 전송
                }
            });

            var sortingField = 'footstep';
            var sortArray = function(a, b){ // 결과값 Json Obj Array의 footstep 값을 비교해 정렬
                return b[sortingField] - a[sortingField];
            };

            var callback = function(err, result){ // 결과값 클라이언트앱 전송 콜백
                res.send(result); 
            };
        }
    });
});

module.exports = router;

