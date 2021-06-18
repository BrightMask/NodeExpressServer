/*
 * @Author: your name
 * @Date: 2021-06-18 10:40:16
 * @LastEditTime: 2021-06-18 10:40:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\app.js
 */
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const expressSession = require('express-session');
const redisStore = require('connect-redis')(expressSession);

// 下面是自定义中间件
const { permissionAuth } = require('./middleware/permissionAuth');
const { setRequestId } = require('./middleware/setRequestId');

// 数据操作后信息返回的方法类封装
const CommonDto = require('./dto/commonDto.class');

// 初始化
const app = express();

const commonDto = new CommonDto();

// 自定义配置文件
// 连接数据库配置文件
require('./config/dbCfg');
// redis服务配置文件
require('./config/redisCfg');
// 日志服务配置文件
require('./config/logCfg');

// app.use 配置中间件
// 使用JSON有效负载解析传入的请求
app.use(express.json());
// 用URL编码的有效负载解析传入的请求
app.use(express.urlencoded({ extended: false }));
// 操作客户端cookie
app.use(cookieParser());
// session操作，
app.use(expressSession({
  // 通过设置的secret字符串，来计算hash值并放在cookie中，使产生的signedCookie防篡改
  secret: 'secret',
  // 设置存放sessionid的cookie的相关选项
  cookie: {maxAge: 24 * 60 * 60 * 1000},
  // 即使session没有被修改，也保存session值，默认为true，这里我们设置为false
  resave: false
  // 强制未初始化的session保存到数据库
  saveUninitialized: false
  //  session的存储方式，默认为存放在内存中，这里我们存储到redis服务中
  store: new redisStore({client: redisClient}),
}));

// 配置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 用于更新浏览器cookie过期时间, 注意 next
app.use((req, res, next) => {
  req.session._garbage = Date();
  req.session.touch();
  next();
});

// 请求头设置，允许接收跨域请求, 注意 next
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, Content-Type, x-auth-token');
  next();
});

// 配置路由
require('./routes')(app);

app.use((req, res, next) => {
  // 有这个中间件才能抛出错误，下面的中间件才能接到
  next(createError(404));
});

// 当有异常时，处理返回到客户端的异常信息，同时保存到本地日志
app.use((err, req, res, next) => {
  if(err.name == 'NotFoundError') {
    res.status(404).json(commonDto.serverErrRespond(err));
  }
  else {
    res.status(500).json(commonDto.serverErrRespond(err));
  }
  logger.error(err);
});

module.exports = app;