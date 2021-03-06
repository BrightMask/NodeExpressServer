/*
 * @Author: your name
 * @Date: 2021-06-18 10:39:23
 * @LastEditTime: 2021-07-05 15:51:48
 * @LastEditors: Please set LastEditors
 * @Description: 服务启动文件 
 * @FilePath: \expressServer\server.js
 */
const http = require('http');
const app = require('./app');
const httpServer = http.createServer(app).listen(3000, () => {
  console.log('http server start, listen 3000...');
  logger.info('http server start, listen 3000...');
});

httpServer.on('error', onError);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error('port 3000 requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('port 3000 is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

process.on('uncaughtException', (err) => {
  logger.error('uncaughtException: ' + err);
});