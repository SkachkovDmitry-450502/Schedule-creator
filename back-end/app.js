var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var login = require('./routes/login');
var signUp = require('./routes/sign-up');
var main = require('./routes/main');

var app = express();
app.set('port', 1488);

app.use(bodyParser.json());
app.use(cookieParser());

app.set('views', path.join(__dirname, '../front-end/error'));
//TODO delete ejs
app.set('view engine', 'jade');

app.use(express.static(path.resolve(__dirname, '../front-end/')));
app.use(express.static(path.resolve(__dirname, '../front-end/login')));
app.use(express.static(path.resolve(__dirname, '../front-end/sign-up')));

app.use('/login', login);
app.use('/sign-up', signUp);
app.use('/main', main);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(1488, function () {
    console.log('Server listening on port 1488!');
});

module.exports = app;
