'use strict';

class RamblerNews {

    constructor() {
        this.baseUrl = 'https://news.rambler.ru/rss/';

        this.ramblerNews = {
            auto: 'auto',
            health: 'health',
            main: 'head',
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
        return this.baseUrl + this.ramblerNews[category];
    }

    /**
     * Получение списка новостей.
     *
     * @param link -- ссылка на список новостей
     * @param quantity -- количество новостей
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

module.exports = RamblerNews;