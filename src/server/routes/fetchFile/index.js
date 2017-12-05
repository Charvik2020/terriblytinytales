'use strict';

var request = require('request');
var q = require('q');
var _ = require('lodash');
var async = require('async');

var ApiError = require('../../lib/error/apiError');
var config = require('../../config');

var TTT = {

	fetchTTTFile: function(req, res, next) {
		if(!req || !req.body || !req.body.numValue) {
	    return next(new ApiError('NO_NUM'));
		}
		if(!Number(req.body.numValue)){
	    return next(new ApiError('NAN'));
		}
		var options = {
	    method  : config.method,
	    url     : config.ttt_endpoint,
	    timeout : config.timeout
	  };
	  request(options, function(e, r, b) {
			if(e || !r) {
				return next(new ApiError('FNF'));
			}
			var fileData = {
				file : [{b}],
				numberReceived : req.body.numValue
			};
	  	req.fileData = fileData;
	  	next();
	  });
	},

	mostFreqOccuringwords: function(req, res, next) {
		var tttFileData = req.fileData.file;
		  async.waterfall([
		    _readFile,
		    _findWordCount
		  ], function (err, resp) {
			  if (err) {
				  return next(err);
			  }
			  req.sendResult = resp;
			  next();
		});

		function _readFile(cb) {
			var result = [],
				hash = {};
			/**
			 * It reads the file and counts the words in the file and maintains the hash
			 * E.g. : { name: 'tales', count: 2 }
			 */

			tttFileData.forEach(function (bb) {
				var words = bb.b.split(" ");
				words.forEach(function (word) {
					word = word.toLowerCase();
					if (word !== "") {
						if (!hash[word]) {
							hash[word] = { name: word, count: 0 };
							result.push(hash[word]);
						}
						hash[word].count++;
					}
				});
			});
			var hashResult = result.sort(function (a, b) { return b.count - a.count;});
			cb(null, hashResult, req.fileData.numberReceived);
		}

		function _findWordCount (hashResult, receivedNumber, cb) {
			var finalResult = {};
			//return the top N most frequently occurring words in this file
			//Display the top N words and their frequency of occurrence in the frontend, in a tabular format
			
			var nMostFreqOccurWords = _.filter(hashResult, {count : Number(receivedNumber)}).slice(0,Number(receivedNumber));
			
			finalResult.nMostFreqOccurWords = nMostFreqOccurWords;
			cb(null, finalResult);
		}
	}

};

module.exports= TTT;
