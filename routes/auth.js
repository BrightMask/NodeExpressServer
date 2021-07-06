/*
 * @Author: your name
 * @Date: 2021-06-28 13:48:37
 * @LastEditTime: 2021-07-06 17:20:24
 * @LastEditors: Please set LastEditors
 * @Description: 用户权限相关
 * @FilePath: \expressServer\routes\auth.js
 */
const express = require('express')

const AuthDto = require('../dto/authDto.class')
const CommonDto = require('../dto/commonDto.class')
const LoginService = require('../service/loginService.class');
const { isParamNull } = require('../util/index');

const router = express.Router()
const authDto = new AuthDto();
const commonDto = new CommonDto();
const loginService = new LoginService();

router.post('/login', async(req, res, next) => {
    let nullParam = isParamNull(req, 'body', ['username', 'password']);
    if(nullParam) {
        res.json(commonDto.isNullRespond(nullParam));
    } else {
        let { err, result } = await loginService.getUserInfoAndAuth(req.body.username, req.body.password);
        console.log('result=====', result)
        console.log('err=====', err)

        if(err) {
            res.json(commonDto.dbRespond(err, []));
        }
        if(!result) {
            res.json(authDto.authFailRespond());
        } else  {
            console.log('登录成功！')

            let { err, results } = await loginService.getRoleByUserId(result.id);
            console.log('results>>>>>>>>>>>>>>>', results)

            if(err) {
                res.json(commonDto.dbRespond(err, []));
            } else  {
                req.session.userInfo = {
                    uid: result.id,
                    username: result.username,
                    phone: result.phone,
                    role: results
                }
                res.json(authDto.authSuccessRespond(req.session.userInfo));
            }
        }

     
    }
     
});

router.get('/logout', (req, res, next) => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
    });
});

module.exports = router;
