/*
 * @Author: your name
 * @Date: 2021-06-24 13:38:43
 * @LastEditTime: 2021-07-06 10:43:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\routes\index.js
 */
const menuRouter = require('./menu');
const authRouter = require('./auth')

module.exports = (app) =>　{
    app.use('/web/auth', authRouter);
    app.use('/web/menu', menuRouter);
};