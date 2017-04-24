const http = require('http');
const request = require('request');
const parseString = require('xml2js').parseString;
const ansi = require('ansi');
const cursor = ansi(process.stdout);

const server = http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    request('https://rakh.im/feed.xml', (error, response, body) => {
        if (!error && response.statusCode === 200) {
            parseString(body, (err, result) => {

                res.write('Название потока: ' + result.rss.channel[0].title + "<br>");
                res.write('Заголовок: ' + result.rss.channel[0].item[0].title + "<br>");
                // res.write(result.rss.channel[0].item[0].description);
                res.write('Дата публикации: ' + result.rss.channel[0].item[0].pubDate + "<br>");

                /*                cursor.red()
                 .write('Название потока: ' + res.rss.channel[0].title + '\n')
                 .green().write(res.rss.channel[0].item[0].title + '\n')
                 .blue().write(res.rss.channel[0].item[0].description + '\n')
                 .grey().write(res.rss.channel[0].item[0].pubDate + '\n')
                 .reset();*/
            });
        }
        else {
            res.write('Произошла ошибка при выполнении запроса к серверу новостей.');
        }
        res.end(req.methods);
    });
});

server.listen(8888);