const yandexNews = require('./YandexNews');
const ramblerNews = require('./RamblerNews');

/**
 * Класс для получения инстанса сервиса новостей.
 */
class NewsFactory {

    constructor(service) {
        this.service = NewsFactory.getServiceInstance(service);

        return this.service;
    }

    /**
     * Factory method.
     *
     * @param service
     * @return {*}
     */
    static getServiceInstance(service) {
        let instance;

        switch (service) {
            case 'yandex':
                instance = new yandexNews();
                break;
            case 'rambler':
                instance = new ramblerNews();
                break;
        }

        return instance;
    }
}

module.exports = NewsFactory;