'use strict';

var util = require('util');
var errorMap = require('./errorMap');
var _ = require('lodash');

var ApiError = function (errorCode, options) {

  this.errorCode = errorCode;
  var mappedError = errorMap.codeMap[errorCode] || {};
  this.httpStatusCode = mappedError.status || 400;
  var message = mappedError.message || "Some error occured";
  _.keys(options || {}).forEach(function(key) {message = message.replace("<" + key + ">", options[key]);});
  this.message = message;

  Error.captureStackTrace(this, ApiError);
};

util.inherits(ApiError, Error);

module.exports = ApiError;