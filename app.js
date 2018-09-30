var express = require('express');
var logger = require('morgan');
var fs = require('fs');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');

var app = express();

// mongoose setup
mongoose.Promise = require('bluebird');

var dbHost = process.env.DB_HOST || 'localhost';
var dbName = process.env.DB_NAME;
var dbUser = process.env.DB_USERNAME;
var dbPass = process.env.DB_PASSWORD;
var dbPort = process.env.DB_PORT || "27017";

mongoose
    .connect("mongodb://" + dbUser + ":" + dbPass + "@" + dbHost + ":" + dbPort + "/" + dbName, { promiseLibrary: require("bluebird"), useNewUrlParser: true })
    .then(() => console.log("connection succesful"))
    .catch(err => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '500kb' }));
app.use(bodyParser.urlencoded({ limit: '500kb', extended: true }));
app.use(cors());

app.get("/uploads/*", function (req, res) {
    fs.readFile(`.${req.url}`, function (err, content) {
        if (err) {
            res.writeHead(400, { 'Content-type': 'text/html' })
            console.log(err);
            res.end("No such image");
        } else {
            res.writeHead(200, { 'Content-type': 'image/jpg' });
            res.end(content);
        }
    });
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
