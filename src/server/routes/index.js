"use strict";

var error = require('./error');
var respond = require('./respond');
var file = require('./fetchFile');

module.exports = function(app) {

  app.all('/_status', function(req, res, next) {
    res.sendStatus(200);
  });

  app.post('/submitNumber', file.fetchTTTFile, file.mostFreqOccuringwords, respond, error);

};
