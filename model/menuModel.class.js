/*
 * @Author: your name
 * @Date: 2021-06-28 13:50:30
 * @LastEditTime: 2021-06-28 13:55:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\model\menuModel.class.js
 */
const Model = require('./index.class');

const model = new Model();

class MenuModel {
    constructor() {}
    async getMenu(conditions, data) {
      return await db.query(`select permission.module from permission_role left join permission on permission_role.pid = permission.id where ${conditions}`, data);
    }
  }
  
  module.exports = MenuModel;