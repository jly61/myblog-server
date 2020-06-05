var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const log4js = require('log4js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const articleRouter = require('./routes/article');
const categoryRouter = require('./routes/category');
const uploadRouter = require('./routes/upload');

var app = express();

// 跨域
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// 日志
app.use(function (req, res, next) {
    const log4js = require('log4js');

    log4js.configure({
        appenders: {
            production: {
                type: 'dateFile',
                filename: '../log/app.log',
                alwaysIncludePattern: true,
                keepFileExt: true,
                daysToKeep: 30,
            }
        },
        categories: {
            default: { appenders: [ 'production' ], level: 'debug' }
        }
    });
    const logger = log4js.getLogger();
    logger.info('博客被访问');
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// 部署上线时
app.use(express.static(path.join(__dirname, './dist')));
app.use(bodyParser.json())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', articleRouter);
app.use('/category', categoryRouter);
app.use('/upload', uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
