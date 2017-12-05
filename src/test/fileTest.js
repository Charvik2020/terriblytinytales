"use strict";

var should = require('should');
var request = require('supertest');

var mockReqBody = require('./testBody.json');

/** Expected parameters in request body:
 * numValue: Number to be submitted.
*/

describe('TTT', function() {
    this.timeout(10000);
    var url = 'http://localhost:7080';
    var validationPath = '/submitNumber';

    it('Number value present in body', function(done) {
      request(url).post(validationPath).set({}).send(mockReqBody).set({}).end(function(err, res) {
        if (err) throw err;
        res.statusCode.should.equal(200);
        done();
      });    
    });

    it('Number not present in body', function(done) {
      delete mockReqBody.numValue;
      request(url).post(validationPath).set({}).send(mockReqBody).set({}).end(function(err, res) {
        if (err) throw err;
        res.statusCode.should.equal(400);
        done();
      });
    });

});
