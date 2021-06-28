/*
 * @Author: your name
 * @Date: 2021-06-28 16:07:58
 * @LastEditTime: 2021-06-28 16:07:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\config\logCfg.js
 */

const log4js = require('log4js');

log4js.configure({
  appenders: {
    serverLog: { 
      type: 'dateFile', 
      filename: './log/node',
      pattern: "_yyyy-MM-dd.log",
      alwaysIncludePattern: true,
    }
  },
  categories: {
    default: {
      appenders: ['serverLog'], 
      level: 'all'
    }
  },
  pm2: true
});

global.logger = log4js.getLogger();
