/*
 * @Author: your name
 * @Date: 2021-06-24 13:45:48
 * @LastEditTime: 2021-06-24 14:00:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \expressServer\routes\menu.js
 */
const express = require('express')

const CommonDto = require('../dto/commonDto.class')
const MenuService= require('../service/menuService.class')

const router = express.Router()
const commonDto = new CommonDto()
const menuService = new MenuService()

router.get('/getMenu', async(req, res, next) => {
    if(req.session.userInfo) {
        let {err, result} = await menuService.getMenu(req.session.userInfo.role);
        res.json(commonDto.dbRespond(err, result));
    } else {
        res.json(authDto.authInvalidRespond())
    }
})

module.exports = router;