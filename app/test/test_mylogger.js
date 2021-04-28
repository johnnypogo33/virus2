/**
 * Test mylogger.js.
 *
 * Use Mocha, Chai and Sinon to run unit tests on ./app/code/mylogger.js.
 *
 * To run these these tests, install Docker and type:
 *
 *     ./scripts/unit-tests-node.sh
 */

(function () {
  'use strict';

  var expect = require('chai').expect;
  var log = require('../app/mylogger');
  var sinon = require('sinon');
  var fs = require('fs');

  /**
   * Test myLogger().
   */
  describe('myLogger()', function () {
    /**
     * Use an assertions array, which is the equivalent of PHPUnit's
     * test provider; this allows the same test logic to be run with different
     * data sets.
     * See https://gist.github.com/burkhardr/54162f667ff756540574082f61350b38.
     */
    const assertions = [
      { text: 'Some text.' },
    ];

    /**
     * Test logic to test myLogger().
     */
    assertions.forEach(({text}) => {
      describe(`Logging ${text}`, function() {
        it(`should log the text ${text}`, function() {
          /**
           * Use Sinon (https://sinonjs.org) to mock appendFile, because we do
           * not want to actually write to the file system, just make sure our
           * function works as expected.
           */
          var appendFile = sinon.stub(fs, 'appendFile');
          /**
           * Call our function with data from the data provider above; this will
           * be called once for "Some text." and once for "Another text.".
           */
          log.myLogger(text);
          /**
           * Confirm that every time myLogger() is called, the "appendFile"
           * function is called once.
           */
          sinon.assert.calledOnce(appendFile);
        });
      });
    });
  });

  /**
   * Test addTwoNumbers().
   */
  describe('addTwoNumbers()', function () {
    /**
     * Data provider for this test.
     */
    const assertions = [
      { first: 5, second: 1 },
      { first: -10000, second: -80 },
      { first: -99999, second: -99999 },
    ];

    /**
     * Test logic to test addTwoNumbers().
     */
    assertions.forEach(({first, second}) => {
      describe(`Adding ${first} and ${second}`, function() {
        var result = first + second;
        it(`should return ${result}`, function() {
          var sum2 = log.addTwoNumbers(first, second);
          expect(sum2).to.be.equal(result);
        });
      });
    });
  });
}());
