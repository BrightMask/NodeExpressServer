/*
 * @Author: your name
 * @Date: 2021-06-18 16:09:12
 * @LastEditTime: 2021-06-18 16:09:30
 * @LastEditors: Please set LastEditors
 * @Description:  header 头上添加一个唯一 id
 * @FilePath: \expressServer\ｍiddleware\setRequestId.js
 */
const uuid = require('uuid');

exports.setRequestId = async function(req, res, next) {
  res.header('request-id', uuid.v1());// v1基于时间戳生成，不会重复
  next();
};