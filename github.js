const ansi = require('ansi');
const cursor = ansi(process.stdout);
const github = require('octonode');
const client = github.client();

client.get('/users/davakir/repos', {}, function (err, status, body, headers) {
    for (repo in body) {
        cursor.bg.grey().red().write(body[repo].name + '\n').reset();
    }
});

