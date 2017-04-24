const http = require('http');

const server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.write('Hello, world!');
    res.end(req.methods);
});

server.listen(8080);