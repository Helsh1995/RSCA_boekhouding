var fs = require('fs'),
    express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('./config/config'),
    expressValidator = require('express-validator');

var app = express();

mongoose.connect(config.DBHost);

// Bootstrap models
var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) require(models_path + '/' + file);
});

var db = mongoose.connection;

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(expressValidator());

app.get('/', function (req, res) {
    res.send("Welcome to the api!");
});

app.listen(port, function () {
    console.log('Running on port ' + port);

    //cron
    require('./cron-jobs/CronJobs').startCronJobs();
});

//routes
require('./routes/routes')(app);

module.exports = app;