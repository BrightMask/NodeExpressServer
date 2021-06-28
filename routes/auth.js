/*
 * @Author: your name
 * @Date: 2021-06-28 13:48:37
 * @LastEditTime: 2021-06-28 14:48:33
 * @LastEditors: Please set LastEditors
 * @Description: 用户权限相关
 * @FilePath: \expressServer\routes\auth.js
 */
const express = require('express')

const AuthDto = require('../dto/authDto.class')
const CommonDto = require('../dto/commonDto.class')
const AuthService = require('../service/AuthService.class')
const LoginService = require('../service/loginService.class');

const router = express.Router()
const authDto = new AuthDto();

router.post('/login', async(req, res, next) => {
    let nullParam = isParamNull(req, 'body', ['username', 'password']);

    if(nullParam) {
        res.json(commonDto.isNullRespond(nullParam));
    } else {
        let { err, result } = await LoginService.getUserInfoAndAuth(req.body.username, req.body.password);
        
        if(err) {
            res.json(commonDto.dbRespond(err, []));
        }

        
        if(!result) {
            res.json(authDto.authFailRespond());
        } else  {
            let { err, results } = await loginService.getRoleByUserId(result.id);
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
     
})