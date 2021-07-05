/*
 * @Author: your name
 * @Date: 2021-06-21 15:50:55
 * @LastEditTime: 2021-07-05 15:50:59
 * @LastEditors: Please set LastEditors
 * @Description: 数据库配置
 * @FilePath: \expressServer\config\dbCfg.js
 */
const mysql = require('mysql')

const envConfig = require('./envCfg')

const pool = mysql.createPool({
    host: envConfig.dbHost,
    user: envConfig.dbUser,
    password: envConfig.dbPassword,
    port: '3306',
    database:'account'
});

function query(sql, params) {
    return new Promise((resolve) => {
      pool.getConnection((err, connection) => {
        console.log('connection success');
        if(err) {
          console.log('db error======', err)
          resolve({
            err,
            results: [],
            fields: []
          });
        }
        else {
          connection.query(sql, params, (err, results, fields) => {
            connection.release();
            resolve({ err, results, fields });
          });
        }
      });
    });
  };
  
  global.db = {
    query
  };
  