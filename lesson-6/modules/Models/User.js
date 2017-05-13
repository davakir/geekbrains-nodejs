const manager = require('../ServiceManagers/DbServiceManager'),
    adapter = manager.getDbInstance();

const EventEmitter = require('events');

/**
 * Active record for manipulating users' data.
 */
class User extends EventEmitter {

    constructor() {
        super();
        this.primaryField = 'id';
        this.tableName = 'users';
    }

    /**
     * Возвращает единственный record из базы по идентификатору.
     */
    read (id) {
        adapter.bindQuery(
            'SELECT * FROM '+this.tableName+' WHERE '+this.primaryField+'=?', id
        )
            .on('error', (err) => {
                this.emit('error', err);
            })
            .on('result', (result) => {
                this.emit('result', result[0]);
            });
        return this;
    }

    /**
     * Создание в базе записи текущего объекта.
     *
     * @param data
     */
    create (data) {
        let values = [],
            props = [],
            bindValues = [];

        for (let prop in data) {
            bindValues.push(data[prop]);
            values.push('?');
            props.push(prop);
        }

        let sql = 'INSERT INTO ' + this.tableName + ' (' + props.join() + ') VALUES (' + values.join() + ')';
        adapter.bindQuery(sql, bindValues);
        return this;
    }

    /**
     * Обновление записи по идентификатору.
     *
     * @param id
     * @param data
     */
    update (id, data) {
        let values = [],
            bindValues = [];

        for (let prop in data) {
            values.push(prop + '=?');
            bindValues.push(data[prop]);
        }
        bindValues.push(id);

        let sql = 'UPDATE ' + this.tableName + ' SET ' + values.join() + ' WHERE '+this.primaryField+'=?';
        adapter.bindQuery(sql, bindValues);
        return this;
    }

    /**
     * Удаление записи о пользователе по идентификатору.
     *
     * @param id
     */
    remove (id) {
        let sql = 'DELETE FROM '+this.tableName+' WHERE '+this.primaryField+'=?';
        adapter.bindQuery(sql, id);
        return this;
    }

    /**
     * Выборка одной записи по условиям.
     *
     * @param where
     */
    findOne (where) {
        let conditions = [],
            bindValues = [];

        for (let prop in where) {
            conditions.push(prop + ' = ?');
            bindValues.push(where[prop]);
        }

        adapter.bindQuery(
            'SELECT * FROM '+this.tableName+' WHERE '+conditions.join(' AND ')+' LIMIT 1', value
        )
            .on('error', (err) => {
                this.emit('error', err);
            })
            .on('result', (result) => {
                this.emit('result', result[0]);
            });
        return this;
    }
}

module.exports = User;