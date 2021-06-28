/*
 * @Author: your name
 * @Date: 2021-06-28 13:50:08
 * @LastEditTime: 2021-06-28 16:09:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\service\menuService.class.js
 */
const MenuModel = require('../model/menuModel.class');

const menuModel = new MenuModel();

class MenuService {
  constructor() {}

  async getMenu(roles) {
    let conditions = '';
    let data = [];

    for(let i in roles) {
      if(i != 0) {
        conditions += ' or ';
      }
      conditions += 'permission_role.rid = ?'
      data.push(roles[i].id);
    }
    
    let { err, results } = await menuModel.getMenu(conditions, data);

    let result = new Set();
    for(let i in results) {
      result.add(results[i].module);
    }
    result = Array.from(result)

    return { err, result };
  }
}

module.exports = MenuService;