const http = require("http");

var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end(req.methods);
});

server.listen(8080);