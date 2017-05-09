const pool = require('./pool-connections');

class MysqlAdapter {

    constructor() {
        this.pool = pool;
    }

    /**
     * Выполнение готового запроса к базе.
     *
     * @param sql -- SQL запрос (подготовленный или нет) (обязательный)
     * @param res -- response
     */
    query(sql, res) {
        let response = {'result': [], 'error': null};

        this.pool.getConnection(function (err, connection) {
            if (err) {
                res.error = err;
                res.json(response);
            }

            connection.query(sql, function (err, result) {
                if (err) {
                    res.error = err;
                    res.json(response);
                }

                connection.release();
                response.result = result;
                res.json(response);
            });
        });
    }

    /**
     * Выполнениие подготовленного запроса к базе.
     *
     * @param sql -- SQL запрос (подготовленный или нет) (обязательный)
     * @param bind -- массив данных для подготовленного запроса (необязательный)
     * @param res -- response
     */
    bindQuery(sql, bind, res) {
        let response = {'result': [], 'error': null};

        this.pool.getConnection(function (err, connection) {
            if (err) {
                response.error = err;
                res.json(response);
            }

            connection.query(sql, bind, function (err, result) {
                if (err) {
                    res.error = err;
                    res.json(response);
                }

                connection.release();
                response.result = result;
                res.json(response);
            });
        });
    }

    findOne (table, field, value, res) {
        let sql = 'SELECT * FROM '+table+' WHERE '+field+'=? LIMIT 1',
            response = {'result': [], 'error': null};

        this.pool.getConnection(function (err, connection) {
            if (err) {
                response.error = err;
                res.json(response);
            }

            connection.query(sql, value, function (err, result) {
                if (err) {
                    res.error = err;
                    res.json(response);
                }

                connection.release();
                response.result = result;
                res.json(response);
            });
        });
    }
}

module.exports = MysqlAdapter;