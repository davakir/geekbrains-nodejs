const connection = require('./connection');

connection.connect();

try {
    connection.query(
        'CREATE TABLE IF NOT EXISTS users (' +
        'id INT PRIMARY KEY AUTO_INCREMENT, ' +
        'login VARCHAR(50), ' +
        'name VARCHAR(50), ' +
        'role VARCHAR(50))', function (result) {
            console.log('Результат: ' + result);
        }
    );
}
catch(e) {
    console.log('Ошибка: ' + e);
}

connection.end();
