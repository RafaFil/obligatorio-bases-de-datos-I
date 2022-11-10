const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    database: "entregaIntermedia",
    user: "admin",
    password: "admin",
    port: "3306",
    multipleStatements: true
})

module.exports = {
    pool
}

