const pool = require('./pool-connections');
const EventEmitter = require('events');


class MysqlAdapter extends EventEmitter{

    constructor() {
        super();
        this.pool = pool;
    }

    /**
     * Выполнение готового запроса к базе.
     *
     * @param sql -- готовый SQL запрос
     */
    query(sql) {
        let self = this;

        this.pool.getConnection(function (err, connection) {
            if (err) {
                self.emit('error', err);
            }

            connection.query(sql, function (err, result) {
                if (err) {
                    self.emit('error', err);
                }

                connection.release();
                self.emit('result', result);
            });
        });

        return this;
    }

    /**
     * Выполнениие подготовленного запроса к базе.
     *
     * @param sql -- SQL запрос подготовленный
     * @param bind -- массив данных для подготовленного запроса
     */
    bindQuery(sql, bind) {
        let self = this;

        this.pool.getConnection(function (err, connection) {
            if (err) {
                self.emit('error', err);
            }

            connection.query(sql, bind, function (err, result) {
                if (err) {
                    self.emit('error', err);
                }

                connection.release();
                self.emit('result', result);
            });
        });

        return this;
    }

    /**
     * Получение единственной записи из таблицы по переданному полю и его значению.
     *
     * @param table -- имя таблицы, из которой будут извлекаться данные
     * @param field -- поле, по которому будет производиться поиск
     * @param value -- значение этого поля
     */
    findOne (table, field, value) {
        let sql = 'SELECT * FROM '+table+' WHERE '+field+'=? LIMIT 1';
        let self = this;

        this.pool.getConnection(function (err, connection) {
            if (err) {
                self.emit('error', err);
            }

            connection.query(sql, value, function (err, result) {
                if (err) {
                    self.emit('error', err);
                }

                connection.release();
                self.emit('result', result);
            });
        });

        return this;
    }
}

module.exports = MysqlAdapter;