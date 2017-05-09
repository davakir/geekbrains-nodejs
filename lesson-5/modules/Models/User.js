const manager = require('../ServiceManagers/DbServiceManager'),
    adapter = manager.getDbInstance();

/**
 * Active record for manipulating users' data.
 */
class User {

    constructor() {
        this.primaryField = 'id';
        this.tableName = 'users';
    }

    /**
     * Возвращает единственный record из базы по идентификатору.
     */
    read (id, res) {
        adapter.bindQuery(
            'SELECT * FROM '+this.tableName+' WHERE '+this.primaryField+'=?', id, res
        );
    }

    create (data, res) {
        let values = [],
            props = [],
            bindValues = [];

        for (let prop in data) {
            bindValues.push(data[prop]);
            values.push('?');
            props.push(prop);
        }

        let sql = 'INSERT INTO ' + this.tableName + ' (' + props.join() + ') VALUES (' + values.join() + ')';
        adapter.bindQuery(sql, bindValues, res);
    }

    /**
     * Обновление записи по идентификатору.
     *
     * @param id
     * @param data
     * @param res
     */
    update (id, data, res) {
        let values = [],
            bindValues = [];

        for (let prop in data) {
            values.push(prop + '=?');
            bindValues.push(data[prop]);
        }
        bindValues.push(id);

        let sql = 'UPDATE ' + this.tableName + ' SET ' + values.join() + ' WHERE '+this.primaryField+'=?';
        adapter.bindQuery(sql, bindValues, res);
    }

    /**
     * Удаление записи о пользователе по идентификатору.
     *
     * @param id
     * @param res
     */
    remove (id, res) {
        let sql = 'DELETE FROM '+this.tableName+' WHERE '+this.primaryField+'=?';
        adapter.bindQuery(sql, id, res);
    }
}

module.exports = User;