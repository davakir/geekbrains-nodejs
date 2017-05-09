const mysql = require('mysql'),
    fs = require('fs'),
    config = JSON.parse(fs.readFileSync('./db-config.json', {"encoding": 'utf-8'})),
    connection = mysql.createConnection(config);

module.exports = connection;