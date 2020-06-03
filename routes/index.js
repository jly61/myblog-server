var express = require('express');
var router = express.Router();
const db = require('../config/db')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

// 获取图片表所有数据
router.get('/image', function (req, res, next) {
    const sql = 'select image_url from image'
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                status: 0,
                msg: '获取图片列表成功',
                result: result
            })
        }
    })
});
module.exports = router;
