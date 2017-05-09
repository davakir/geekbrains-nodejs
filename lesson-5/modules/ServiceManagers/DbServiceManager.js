const mysql = require('../Db/MysqlAdapter');

class DbServiceManager {

    /**
     * Factory method for getting current db driver instance.
     *
     * @return {*}
     */
    static getDbInstance () {
        const dbDriver = 'mysql';
        let instance;

        switch (dbDriver) {
            case 'mysql':
                instance = new mysql();
        }

        return instance;
    }
}

module.exports = DbServiceManager;