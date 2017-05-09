const connection = require('./connection');

connection.connect();

try {
    connection.query(
        'CREATE TABLE IF NOT EXISTS tasks (' +
        'id INT PRIMARY KEY AUTO_INCREMENT, ' +
        'user_id INT, ' +
        'title VARCHAR(50), ' +
        'content TEXT,' +
        'priority INT(2))', function (result) {
            console.log('Результат: ' + result);
        }
    );
}
catch(e) {
    console.log('Ошибка: ' + e);
}

connection.end();
