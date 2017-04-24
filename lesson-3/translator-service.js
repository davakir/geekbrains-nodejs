const http = require('http');
const urlUtils = require('url');
const qsUtils = require('querystring');
const request = require('request');
const fs = require('fs');

class TranslatorService {
    constructor() {
        this.schema = 'https';
        this.host = 'translate.yandex.net';
        this.servicePath = '/api/v1.5/tr.json/translate';
        this.apiKey = 'trnsl.1.1.20170424T141542Z.25ab7c8bd033a62e.f42ec73c9956824331d4d599f65c5f5059825911';
    }

    translate(text, callback) {
        const params = {
            'protocol': this.schema,
            'host': this.host,
            'pathname': this.servicePath,
            'query': {
                'key': this.apiKey,
                'text': qsUtils.escape(text.toLowerCase()),
                'lang': 'en-ru'
            }
        };

        request(urlUtils.format(params), (error, response, body) => {
            console.log(body);
            if (!error && response.statusCode === 200) {
                callback(body);
            } else {
                throw Error(error);
            }
        });
    }
}

const service = new TranslatorService();

http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    if (request.method == "GET") {
        let httpQuery = qsUtils.parse(urlUtils.parse(request.url).query);
        let query = qsUtils.unescape(httpQuery.q);

        let content = fs.readFileSync("./html/translator.html", {"encoding": "utf-8"});
        if (query !== undefined && query.length > 0) {
            content = content.replace('${value}', query);
            service.translate(query, body => {
                if (body !== undefined && body.length > 0) {
                    let data = JSON.parse(body);
                    const result = data.text.join(', ');
                    content = content.replace('${result}', result);
                }

                response.end(content);
            });
        } else {
            response.end(content);
        }
    } else {
        response.writeHead(400);
    }
}).listen(8888);

