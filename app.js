const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const config = require("./bin/config");
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'public')));

global.handlebars = hbs;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use("/", require('./controller/index'));


if (!process._eval) {
    app.listen(config.port, function () {
        console.log('HTTP server started at port ' + config.port);
    });
}

module.exports = app;