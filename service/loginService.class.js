/*
 * @Author: your name
 * @Date: 2021-06-28 14:16:16
 * @LastEditTime: 2021-07-06 17:19:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\service\loginService.class.js
 */
const CommonModel = require('../model/commonModel.class');
const util = require('../util/index');
const commonModel = new CommonModel();

class LoginService {
    constructor () {}
    async getUserInfoAndAuth(username, password) {
        let {err, results} = await commonModel.findUserInfoByUserName(username)
        if(err) {
            return {
                err,
                result: []
            }
        // } else if (!results[0] || results[0].password != util.cryptoBySha256(results[0].salt + password)) {
        } else if (!results[0]) {

            return {
                err: null,
                result: null
            }
        }
        return {
            err: null,
            result: results[0]
        }
    }

    async getRoleByUserId(userId) {
        return await commonModel.findRoleByUserId(userId)
    }
}

module.exports = LoginService;