'use strict';

var TIMEOUT = {
  msg     : "Sorry! We are having problem connecting. Please try again after sometime.",
  title   : "Connectivity issue."
};

/*
httpMap - Common HTTP codes mapped to their message.

codeMap - Specific error codes for application errors. Each object has 4 fields
   message : This will be the error message that will be returned to client. Should be user friendly message.
   title   : Similar to above, it is returned as error title. Used error dialogs on UI.
   status  : HTTP status.
   xmsg    : Not sent in response. Can be used for internal purposes.
 */

var map = {

  httpMap: {
    400: "Bad Request",
    401: "Login required",
    403: "Forbidden",
    404: "Not Found",
    406: "Validation Error",
    412: "Precondition Failed",
    422: "Unprocessable Entity",
    500: "Unknown Error",
  },

  codeMap: {
    'NO_NUM': {
      message : "No number available in request",
      title   : "No number available in request",
      status  : 400
    },

    'NAN': {
      message : "Not a number",
      title   : "Not a number in the request received",
      status  : 400
    },

    'FNF': {
      message : "File not found",
      title   : "File not found in the request received",
      status  : 404
    }

  }
};

module.exports = map;
