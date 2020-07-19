/*
 * Write a function to flatten a nested dictionary. Namespace the keys with a period.

For example, given the following dictionary:

{
    "key": 3,
    "foo": {
        "a": 5,
        "bar": {
            "baz": 8
        }
    }
}
it should become:

{
    "key": 3,
    "foo.a": 5,
    "foo.bar.baz": 8
}
You can assume keys do not contain dots in them, i.e. no clobbering will occur.
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    let dict = {
      "key": 3,
      "foo": {
        "a": 5,
        "bar": {
          "baz": 8
        }
      }
    };
    assert.deepEqual(flatten(dict), {
      "key": 3,
      "foo.a": 5,
      "foo.bar.baz": 8
    });
  });
});

function flatten(dict) {
  // iterate through the keys of the dictionary
  // check if value is an object - if it is, recursively iterate
  // otherwise construct the key string and continue
  let recurseFlat = (initKey, innerDict) => {
    for (let k in innerDict) {
      if (typeof innerDict[k] == 'object') {
        recurseFlat(`${initKey}.${k}`, innerDict[k]);
      } else {
        dict[`${initKey}.${k}`] = innerDict[k];
      }
    }
  }
  for (let k in dict) {
    if (typeof dict[k] == 'object') {
      recurseFlat(k, dict[k]);
      delete dict[k];
    }
  }
  return dict;
}
