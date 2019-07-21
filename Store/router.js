var express = require('express');
var app = express();

var monk = require('monk');
var db = monk("mongodb://admin:Test123@localhost:27017/Store?authSource=admin");

app.listen(3000);

app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use('/productcount', require('./category_product'));
