/*
 * @Author: your name
 * @Date: 2021-06-18 10:40:16
 * @LastEditTime: 2021-06-28 16:02:58
 * @LastEditors: Please set LastEditors
 * @Description: 入口文件
 * @FilePath: \expressServer\app.js
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const redisStore = require('connect-redis')(expressSession);

const { permissionAuth } = require('./middleware/permissionAuth');
const { setRequestId } = require('./middleware/setRequestId');
const CommonDto = require('./dto/commonDto.class');

const app = express();
const commonDto = new CommonDto();

require('./config/dbCfg');
require('./config/redisCfg');
require('./config/logCfg');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json());
//express.urlencoded 解析 URL-encoded 格式的请求体数据
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'secret',
  cookie: {maxAge: 24 * 60 * 60 * 1000},
  resave: false, //每次访问以后，session的过期时间是否往后推迟，现在改成在后面的中间件中推迟过期时间
  saveUninitialized: false, //无论有没有session cookie，每次请求都设置个session cookie，默认给个标示为 connect.sid，一定是false
  store: new redisStore({client: redisClient}),
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(permissionAuth);
app.use(setRequestId);
// 用于更新浏览器cookie过期时间
app.use((req, res, next) => {
  req.session._garbage = Date();
  req.session.touch();
  next();
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, Content-Type, x-auth-token');
  next();
});

require('./routes')(app);

app.use((req, res, next) => {
  // 有这个中间件才能抛出错误，下面的中间件才能接到
  next(createError(404));
});

app.use((err, req, res, next) => {
  if(err.name == 'NotFoundError') {
    res.status(404).json(commonDto.serverErrRespond(err));
  }
  else {
    res.status(500).json(commonDto.serverErrRespond(err));
  }
  logger.error(err);
});

if (process.env.NODE_ENV == 'test') {
  // 注意：生成根管理员
  const Test = require('./test');
  const test = new Test();
  test.addUser('root','root','18034021312', 'root');
}


module.exports = app;
