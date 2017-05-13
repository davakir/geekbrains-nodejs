const express = require('express'),
    app = express(),
    request = require('request'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    passport = require('passport'),
    consolidate = require('consolidate'),
    bodyParser = require('body-parser'),
    handlebars = require('handlebars'),

    User = require('./modules/Models/User'),
    UserModel = new User(),

    LocalStrategy = require('passport-local').Strategy;

/**
 * Парсим тело POST-запроса с настройками для получения новостей.
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('hbs', consolidate.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use(cookieParser());
app.use(cookieSession({keys: ['secret']}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Логика авторизации
 */
passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
}, (login, password, done) => {
    UserModel
        .findOne({login: login, password: password})
        .on('result', (user) => {
             done(null, user);
        })
        .on('error', (error) => {
             done(null, false, {message: error})
        });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    UserModel
        .read(id)
        .on('result', (user) => {
            done(null, user)
        })
        .on('error', (error) => {
            done(error.error);
        });
});

app.get('/login', (req, res) => {
    res.render('login-form', {});
});

app.post('/login', (req, res) => {
    // let params = req.body;

    passport.authenticate('local',
        function(err, user) {
            if (!user)
                res.redirect('/login');
            else
                res.redirect('/');
        }
    )(req, res);
});

app.get('/login/:id', (req, res) => {
    const userId = req.params.id;

    UserModel
        .read(userId)
        .on('result', (result) => {
            res.json(result);
        });
});

app.get('/', (req, res) => {
    res.render('index', {
        login: 'Login',
        name: 'Name',
        surname: 'Surname'
    });
});

app.listen(8888);