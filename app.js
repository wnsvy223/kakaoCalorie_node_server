var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var showAllData = require('./routes/show-all-data'); // 사용자 조회 
var createUser = require('./routes/create-user'); // 사용자 생성
var sendCount = require('./routes/send-count'); // 만보기 카운트 
var showRank = require('./routes/show-rank'); // 순위 조회
//var mysqlDB = require('./mysqlDB');
//mysqlDB.connect(); // 커넥션


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //express 4.16.0이상 버전에선 bodyparser가 express모듈에 포함되어 따로 모듈 추가할 필요없음.
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/show-all-data',showAllData); // 브라우저 url경로로 ip주소:port/show-all-data번호 로 브라우저 접속시 전체유저목록 값 나옴.
app.use('/create-user',createUser); // 사용자정보 DB 생성 or 이미 있으면 로그인 처리 모듈
app.use('/send-count',sendCount); // 만보기 카운트 전송
app.use('/show-rank',showRank); // 순위 조회
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
