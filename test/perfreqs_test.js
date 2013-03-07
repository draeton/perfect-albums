'use strict';

var perfreqs = require('../lib/perfreqs.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['awesome'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'start': function(test) {
    test.expect(2);
    // tests here
    var pr = perfreqs();
    var _bind = pr.bind;
    pr.bind = function () {
      return true;
    };

    test.equal(pr.status(), "off", "should be off");
    pr.start();
    test.equal(pr.status(), "on", "should be on");
    test.done();

    pr.bind = _bind;
  },
};
