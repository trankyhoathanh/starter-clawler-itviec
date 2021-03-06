var express = require('express');
var app = express();
var port = process.env.port || 50001;
var server = require("http").Server(app);
var bodyParser = require('body-parser');

// Structure CORS
const cors = require('cors');
app.use(cors());
app.options('*', cors());

// Structure config system
app.use(function (req, res, next) {
    res.setHeader('X-Powered-By', 'TRAN KY HOA THANH Example Clawler ItViec');
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

prodServiceLocator = require('./structure/serviceLocator')()
prodServiceLocator.register('database', require('./connection/sequelize'))

// Structure CONTROLLERS
var defaultController = require('./Controller/defaultController')();
app.use("/", defaultController);

var companiesController = require('./Controller/companiesController')();
app.use("/companies", companiesController);

// Run system
server.listen(port, function() {
  var datetime = new Date();
    var message = "Server runnning on Port:- " + port + "\r\nStarted at :- " + datetime;
    console.log(message);
})
