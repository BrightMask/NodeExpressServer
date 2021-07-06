/*
 * @Author: your name
 * @Date: 2021-06-21 15:53:13
 * @LastEditTime: 2021-07-06 15:40:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\config\envCfg.js
 */

const devConfig = {
  dbHost: '127.0.0.1',
  dbUser: 'root',
  dbPassword: 'XU159357xly_',
};

const prodConfig = {
  dbHost: 'xxxxx',
  dbUser: 'xxxxx',
  dbPassword: 'xxxx'
};

if(process.env.NODE_ENV == 'prod') {
  module.exports = prodConfig;
}
else {
  module.exports = devConfig;
}