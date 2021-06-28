/*
 * @Author: your name
 * @Date: 2021-06-24 13:38:43
 * @LastEditTime: 2021-06-28 13:48:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\routes\index.js
 */
const menuRouter = require('./menu');
module.exports = (app) =>　{
    app.use('/web/menu', menuRouter)
}