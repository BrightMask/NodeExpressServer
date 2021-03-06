/*
 * @Author: your name
 * @Date: 2021-06-28 13:50:48
 * @LastEditTime: 2021-06-28 13:54:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\model\index.class.js
 */
class Model {
    constructor() {}
    async getCountWithNoConditions(tableName) {
        let { err, results, fields } = await db.query(`select count(*) from ${tableName}`, []);
    
        return { err, results };
      }
    
      async getCountWithConditions(tableName, conditions, data) {
        let { err, results, fields } = await db.query(`select count(*) from ${tableName} where ${conditions}`, data);
    
        return { err, results };
      }
    
      async selectWithNoConditions(tableName, column) {
        let { err, results, fields } = await db.query(`select ${column} from ${tableName}`, []);
    
        return { err, results };
      }
    
      async selectWithConditions(tableName, column, conditions, data) {
        let { err, results, fields } = await db.query(`select ${column} from ${tableName} where ${conditions}`, data);
    
        return { err, results };
      }
    
      async insert(tableName, column, format, data) {
        let { err, results, fields } = await db.query(`insert ${tableName} (${column}) values ${format}`, data);
        
        return { err, results };
      }
    
      async del(tableName, conditions, data) {
        let { err, results, fields } = await db.query(`delete from ${tableName} where ${conditions}`, data);
    
        return { err, results };
      }
    
      async update(tableName, format, conditions, data) {
        let { err, results, fields } = await db.query(`update ${tableName} set ${format} where ${conditions}`, data);
    
        return { err, results };
      }

}
module.exports = Model;
