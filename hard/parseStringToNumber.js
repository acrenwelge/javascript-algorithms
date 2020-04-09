/*
Given a string, return whether it represents a number. Here are the different kinds of numbers:

"10", a positive integer
"-10", a negative integer
"10.1", a positive real number
"-10.1", a negative real number
"1e5", a number in scientific notation
And here are examples of non-numbers:

"a"
"x 1"
"a -2"
"-"
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass positive default cases', () => {
    assert.ok(parse('10') === true);
    assert.ok(parse('-10') === true);
    assert.ok(parse('10.1') === true);
    assert.ok(parse('-10.1') === true);
    assert.ok(parse('1e5') === true);
  });
  it('should fail negative default cases', () => {
    assert.ok(parse('a') === false);
    assert.ok(parse('x 1') === false);
    assert.ok(parse('a -2') === false);
    assert.ok(parse('-') === false);
  });
});

function parse(str) {
  str.trim();
  let num = Number(str);
  if (isNaN(num)) {
    return false;
  } else return true;
}
