const express = require('express');
const router = express.Router();
const db = require('../config/db');

/* 测试数据库连接 */
router.get('/', function(req, res, next) {
  // let sql = `insert into user(username, password, role) values("liuyi", "123456", 'admin')`
});
// 用户登陆
router.post('/login', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.pwd;
  let sql = `select * from user where email = "${email}" and password = "${password}"`;
  db.query(sql, (err, result) => {
    if (err || result.length === 0) {
      res.json({
        status: 1,
        msg: '登陆失败',
        result: err
      })
    } else {
      res.json({
        status: 0,
        msg: '登陆成功',
        result: {
          nickname: result[0].nickname,
          email: result[0].email,
          avatar: result[0].avatar
        }
      })
    }
  });
});
// 用户登陆
router.post('/register', function(req, res, next) {
  const nickname = req.body.nickname
  const email = req.body.email;
  const password = req.body.pwd;
  console.log(req.body)
  let select_sql = `select * from user where email = "${email}" or nickname = ${nickname}`;
  let insert_sql = `insert into user(nickname, password, email) values("${nickname}", "${password}", "${email}")`
  db.query(select_sql, (err, result) => {
    if (result.length > 0) {
      res.json({
        status: 2,
        msg: '用户名已存在'
      });
      return
    }
    db.query(insert_sql, (err2, result2) => {
      if (err2 || result2.length === 0) {
        res.json({
          status: 1,
          msg: '注册失败',
          result: err2
        })
      } else {
        res.json({
          status: 0,
          msg: '注册成功',
          result: nickname
        })
      }
    });
  })
});
// 管理员登陆
router.post('/admin-login', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  let sql = `select * from admin where username = "${username}" and password = "${password}"`;
  db.query(sql, (err, result) => {
    if (err || result.length === 0) {
      res.json({
        status: 1,
        msg: '查询失败',
        result: err
      })
    } else {
      res.json({
        status: 0,
        msg: '查询成功',
        result: {
          username: result[0].username,
          role: result[0].role
        }
      })
    }
  });
});

module.exports = router;
