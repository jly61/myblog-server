const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'xing3721',
    database: 'blog'
});
connection.connect(err => {
    if (err) {
        console.log(err)
    }
})
module.exports = connection

