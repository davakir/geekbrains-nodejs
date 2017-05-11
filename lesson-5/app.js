const manager = require('./modules/ServiceManagers/DbServiceManager'),
    adapter = manager.getDbInstance(),
    express = require("express"),
    app = express();

const user = require('./modules/Models/User'),
    userModel = new user();

function getUsers(res) {
    adapter.query(
        'SELECT * FROM users', res
    );
}

app.get('/users/get', function(req, res) {
    getUsers(res);
});

app.get('/users/create', function (req, res) {
    userModel.create({login: 'parasha', name: 'Прасковья', role: 'manager'}, res);
});

app.get('/users/:id/update', function (req, res) {
    const userId = req.params.id;
    userModel.update(userId, {name: 'Дарья Кирьянова', role: 'nobody'}, res);
});

app.get('/users/:id/delete', function (req, res) {
    const userId = req.params.id;
    userModel.remove(userId, res);
});

app.get('/users/:id', function (req, res) {
    const userId = req.params.id;
    userModel.read(userId, res);
});

app.listen(3000);