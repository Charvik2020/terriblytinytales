'use strict';

var putils = require('../lib/utils');

module.exports = function respondfn(req, res, next) {
  putils.timeRequest(req, 'respond');
  if ((req.url & req.url.indexOf('jsonp') > -1) ||
    (req.query && (req.query.callback || req.query.CALLBACK))) {
    res.jsonp(req.sendResult);
  } else {
    res.json(req.sendResult);
  }

};

/*-----------------------------------------------------------------------------------------------*/

if (require.main === module) {
  (function () {
    var req = {
      sendResult: {
        result: 'Ok',
        data: 'test respond data'
      },
      url: 'testing',
      query: {
        CALLBACK: 'Testing'
      }
    };
    var res = {
      json: console.log,
      jsonp: function (data) {
        console.log('jsonp', data);
      }
    };
    module.exports(req, res);
  })();
}
