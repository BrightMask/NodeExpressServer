/*
 * @Author: your name
 * @Date: 2021-06-28 14:12:28
 * @LastEditTime: 2021-06-28 14:12:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\utils\index.js
 */
const crypto = require('crypto');

exports.cryptoBySha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest('base64').toString();
};

exports.isParamNull = (req, type, fields) => {
  for(let i of fields) {
    if(req[type][i] == undefined) {
      return i;
    }
  }

  return false;
}