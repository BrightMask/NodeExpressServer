/*
 * @Author: your name
 * @Date: 2021-06-23 16:17:02
 * @LastEditTime: 2021-07-05 15:46:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\model\permissionAuthModel.class.js
 */
class PermissionAuthModel {
    constructor() {}
  
    async getRolesByModule(module) {
      let query = 'select rid from permission as a left join permission_role as b on a.id = b.pid where a.module = ?';
      let data = [module];
      return await db.query(query, data);
    }
  }
  
  module.exports = PermissionAuthModel;