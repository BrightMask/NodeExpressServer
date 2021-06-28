/*
 * @Author: your name
 * @Date: 2021-06-28 16:07:37
 * @LastEditTime: 2021-06-28 16:07:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\config\redisCfg.js
 */
const redis = require('redis');
const client = redis.createClient();

client.on('ready', (err) => {
  if(err){        
    console.log('connect redis err: ' + err);
    
    return;
  }
  console.log('connect redis success');
});

global.redisClient = client;