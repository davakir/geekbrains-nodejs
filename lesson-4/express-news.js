/**
 * Подключаемые модули.
 */
const express = require('express'),
    consolidate = require('consolidate'),
    bodyParser = require('body-parser'),
    handlebars = require('handlebars'),
    cookieParser = require('cookie-parser'),
    NewsFactory = require('./modules/NewsFactory'),
    NewsCookie = require('./modules/NewsCookie'),
    request = require('request'),
    app = express();

/**
 * Глобальные данные для работы с новостями.
 *
 * @type {[*]}
 */
const newsSources = [
        'yandex', 'rambler'
    ],
    ruNewsSources = {
        yandex: "Яндекс",
        rambler: "Рамблер"
    },
    quantity = [
        5, 10, 15
    ],
    categories = [
        'auto', 'health', 'main', 'science', 'sport'
    ],
    newsTitles = {
        auto: 'Авто',
        health: 'Здоровье',
        main: 'Главное',
        science: 'Наука',
        sport: 'Спорт'
    };

app.engine('hbs', consolidate.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use(cookieParser());

/**
 * Парсим тело POST-запроса с настройками для получения новостей.
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Возвращает русское название сервиса новостей.
 * Используется в шаблонах.
 */
handlebars.registerHelper('getSourceTitle', function(source) {
    return ruNewsSources[source];
});

/**
 * Возвращает русское название категории новостей.
 * Используется в шаблонах.
 */
handlebars.registerHelper('getCategoryTitle', function(category) {
    return newsTitles[category];
});

/**
 * Возвращает список новостей согласно настройкам списка.
 *
 * @param params
 * @return {{sourceName: *, news: *}}
 */
function getNews(params) {
    let service = params.source,
        category = params.category,
        quantity = params.quantity;

    let newsService = new NewsFactory(service),
        link = newsService.generateUrl(category),
        news = newsService.getNews(link, quantity);

    return {
        sourceName: ruNewsSources[service],
        news: news
    };
}

/**
 * Главная страница с настройками выдачи новостей.
 * Настройки при первом запросе на 15 минут сохраняются в куку.
 * Эти настройки будут действовать 15 минут, пока кука не подохнет.
 * Только после этого пользователь сможет сделать новую выборку... Это не баг, это фича!
 */
app.get('/', (request, response) => {
        response.render('news-settings', {
            title: 'Настройка вывода новостей',
            sources: newsSources,
            quantity: quantity,
            categories: categories
        });
});

/**
 * Страница со списком новостей.
 */
app.get('/news', (request, response) => {

    let cookie = new NewsCookie();
    let result = {};

    let newsCookie = cookie.getCookie(request);
    if (newsCookie) {
        result = getNews(newsCookie);
    }
    else if (request.query.source && request.query.quantity && request.query.category) {
        result = getNews(request.query);
        cookie.setCookie(request.query, response);
    }
    else {
        response.redirect('/');
    }

    response.render('news', {
        sourceName: result.sourceName,
        news: result.news
    });
});

/**
 * Обрабатывает POST-запрос.
 * Получение новостей в зависимости от переданных настроек:
 * - сервис
 * - категория
 * - количество
 */
app.post('/news/receive', (request, response) => {
    response.json(getNews(request.body));
});

app.listen(8888);