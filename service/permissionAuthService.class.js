/*
 * @Author: your name
 * @Date: 2021-06-23 16:16:31
 * @LastEditTime: 2021-06-23 16:16:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\service\permissionAuthService.class.js
 */
const PermissionAuthModel = require('../model/permissionAuthModel.class');

const permissionAuthModel = new PermissionAuthModel();

class PermissionAuthService {
  constructor() {}

  async permissionAuth(roles, module) {
    let { err, results } = await permissionAuthModel.getRolesByModule(module);

    for(let i of roles) {
      for(let j of results) {
        if(i.id == j.rid) {
          return true;
        }
      }
    }

    return false;
  }
}

module.exports = PermissionAuthService;
