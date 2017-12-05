"use strict";

/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var routes = require('./src/server/routes');
var http = require('http');
var path = require('path');
var util = require('util');
var env = process.env.NODE_ENV || 'development';
var webpack = require('webpack');
var  wdm = require('webpack-dev-middleware');
var  whm = require('webpack-hot-middleware');
const compiler = webpack(require('./webpack.config'));
var app = express();
app.use(wdm(compiler, {publicPath: '/'}));
app.use(whm(compiler,  {path: '/__webpack_hmr'}));

// Setup Express
app.set('port', process.env.PORT || 7080);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'doc')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));


// Add our routes
routes(app);

// Start the web service
http.createServer(app)
.on('error',function(err) {
  util.log(err);
  process.exit(1);
})
.listen(app.get('port'), function(){
  util.log("Fulfillment Service listening on port " + app.get('port'));
});
