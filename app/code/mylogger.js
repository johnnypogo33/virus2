/**
 * My Logger module.
 *
 * This module does not really do much, it exists mostly to demonstrate how code
 * can be unit tested.
 *
 * This module's test code is at ./app/test/test_mylogger.js.
 *
 * Tests can be run on any system by installing Docker and typing:
 * ./app/test/test_mylogger.js.
 */

(function () {
  'use strict';

  var fs = require('fs');
  var os = require('os');

  /**
   * Log text to logs/log.log.
   *
   * This function demonstrates mocking. In this case this function uses
   * fs.appendFile(), but during unit testing we do not want to actually write
   * to the file system. That is why, in ./app/test/test_mylogger.js, we are
   * mocking fs.appendFile() using sinon.stub (see https://sinonjs.org).
   *
   * @param string text
   *   The text to log.
   */
  exports.myLogger = function (text) {
    fs.appendFile('logs/log.log', text + os.EOL, function (err) {
      if (err) {
        console.log(err);
      }
      console.log('Saved!');
    });
  };

  /**
   * Add two numbers.
   *
   * This function exists to demonstrate how to unit test pure functions using
   * provider data, see ./app/test/test_mylogger.js.
   *
   * @param x
   *   First number in addition.
   * @param y
   *   Second number in addition.
   */
  exports.addTwoNumbers = function (x, y) {
    return x + y;
  };
}());
