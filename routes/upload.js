// 七牛文件上传

const qnconfig = require('../config/qiniu');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const token = qnconfig.uploadToken;
    res.json({
        status: 0,
        message: '获取上传凭证成功',
        result: {
            upToken: token
        }
    })
})

module.exports = router

