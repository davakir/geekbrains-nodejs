const mysql = require('mysql'),
    fs = require('fs'),
    config = JSON.parse(fs.readFileSync('./db-config.json', {"encoding": 'utf-8'})),
    pool = mysql.createPool(config);

module.exports = pool;