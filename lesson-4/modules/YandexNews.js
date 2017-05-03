'use strict';

class YandexNews {

    constructor() {
        this.baseUrl = 'https://news.yandex.ru/';

        this.categories = {
            auto: 'auto',
            health: 'health',
            main: 'index',
            science: 'science',
            sport: 'sport'
        };
    }

    /**
     * Функция генерирует ссылку на получение новостей.
     *
     * @param category
     * @returns {string}
     */
    generateUrl(category) {
        return this.baseUrl + this.categories[category] + '.rss';
    }

    /**
     * Получение списка новостей.
     *
     * @param link -- ссылка на список новостей
     * @param quantity -- количество новостей
     *
     * @returns Object -- {title:<>, data: <>} | {error: <>}
     */
    getNews(link, quantity) {
        const request = require('sync-request');
        const parseString = require('xml2js').parseString;

        let data = {},
            res = request('GET', link);

        if (res.statusCode == 200) {
            let result = res.getBody();

            parseString(result, (err, result) => {
                data.title = result.rss.channel[0].title;

                let news = result.rss.channel[0].item.slice(0, quantity);

                data.data = [];
                for (let i = 0; i < news.length; ++i) {
                    let item = {
                        title: news[i].title,
                        description: news[i].description,
                        date: news[i].pubDate
                    };
                    data.data.push(item);
                }
            });
        }
        else {
            data.error = 'Error occurred while getting news';
        }

        return data;
    }
}

module.exports = YandexNews;