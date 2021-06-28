/*
 * @Author: your name
 * @Date: 2021-06-28 14:18:55
 * @LastEditTime: 2021-06-28 14:22:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\model\commonModel.class.js
 */
const Model = require('./index.class')

const model = new Model()

class CommonModel {
    constructor () {}

    async findUserInfoByUserName(username) {
        return await model.selectWithConditions('user', '*', 'username = ?', [username]);
    }

    async findUserInfoByUserId(userId) {
        return await model.selectWithConditions('user', '*', 'id = ?', [userId])
    }

    async findRoleByUserId(userId) {
        let query = 'select b.id, name, nameZh from user_role as a left join role as b on a.rid = b.id where a.uid = ?';
        let data = [userId];
        return await db.query(query, data);
    }
}
module.exports = CommonModel;
