const http = require('http');
const request = require('request');
const parseString = require('xml2js').parseString;

const server = http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    request('https://rakh.im/feed.xml', (error, response, body) => {
        if (!error && response.statusCode === 200) {
            parseString(body, (err, result) => {
                res.write('<h1>Название потока: ' + result.rss.channel[0].title + '</h1><br><br>');

                for (let i = 0; i < result.rss.channel[0].item.length; ++i) {
                    let item = result.rss.channel[0].item[i];
                    res.write('<strong>Заголовок: ' + item.title + '</strong><br>');
                    res.write('' + item.description + '<br>');
                    res.write('<i>Дата публикации: ' + item.pubDate + '</i><br><br>');
                }
            });
        }
        else {
            res.write('Произошла ошибка при выполнении запроса к серверу новостей.');
        }
        res.end(req.methods);
    });
});

server.listen(8888);