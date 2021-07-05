/*
 * @Author: your name
 * @Date: 2021-06-18 16:09:38
 * @LastEditTime: 2021-07-05 17:02:52
 * @LastEditors: Please set LastEditors
 * @Description:判断用户的权限
 * @FilePath: \expressServer\middleware\permissionAuth.js
 */
// 忽视的请求模块-即无需判断权限，这里获取菜单相关的模块接口无需判断权限
const PermissionAuthService = require('../service/permissionAuthService.class');
const AuthDto = require('../dto/authDto.class');

const ignoreModule = ['menu'];
// 忽视的请求，比如登录|登出，无需判断权限
const ignorePath = ['/web/auth/login'];
// 忽视的用户角色-若用户是管理员，无需判断权限
const ignoreRole = ['root'];
const authDto = new AuthDto();
const permissionAuthService = new PermissionAuthService();

exports.permissionAuth = async function(req, res, next) {
    // 判断客户端请求地址的path，获取菜单模块，前后端菜单模块命名保持一致，由前端路由配置模块确定
    const module = req.path.split('/')[1];
    console.log('req=======', req.path)
    if(ignoreModule.indexOf(module) != -1 || ignorePath.indexOf(req.path) != -1) {

      console.log('不校验权限')
        next();
    } 
    // 若用户未登录，返回未登录异常信息
    else 
    if (!req.session.userInfo) {
        // authDto 是用户账户的信息封装
        res.json(authDto.authInvalidRespond());
    }
    else {
        // 用户角色判断
        for(let i of req.session.userInfo.role) {
          if(ignoreRole.indexOf(i.name) != -1) {
            next();
            return;
          }
        }
        // 获取当前用户的权限信息
        let hasPermission = await permissionAuthService.permissionAuth(req.session.userInfo.role, module);

        console.log('hasePermission===========', hasPermission)
        if(hasPermission) {
          next();
        } else {
            // 否则返回客户端信息，用户无权限
            res.status(403).json(authDto.authForbiddenRespond());
        }
    }
}