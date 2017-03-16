// import all required modules
var express = require('express')
var http = require('http');
var https = require('https')
var path = require('path');
var mysql = require('mysql');
// Setup express app 
var app = express()
var bodyParser = require('body-parser');

// import all application modules
var apis = require('./routes/apis.js');
app.use(bodyParser.json({ limit: '5mb' })); // support json encoded bodies
app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
})); // support encoded bodies

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.use('/api', apis);

// Setup http server
var httpserver = http.createServer(app).listen(3030, function() {
    var host = httpserver.address().address;
    var port = httpserver.address().port;
    console.log('app listening at http://%s:%s', host, port);
});

// Create an HTTPS service identical to the HTTP service.
var httpsserver = https.createServer(app).listen(3040, function() {
    var host = httpsserver.address().address;
    var port = httpsserver.address().port;
    console.log('app(https) listening at https://%s:%s', host, port);
});
