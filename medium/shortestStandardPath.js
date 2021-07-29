/**
 * Given an absolute pathname that may have . or .. as part of it, return the shortest standardized path.

For example, given "/usr/bin/../bin/./scripts/../", return "/usr/bin/".
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    assert.strictEqual(shortestStdPath('/usr/bin/../bin/./scripts/../'),'/usr/bin/');
  });
  it('should pass the custom case', () => {
    assert.strictEqual(shortestStdPath('/etc/config/./kube/../text.txt'),'/etc/config/text.txt');
  });
});

function shortestStdPath(filepath) {
  let newfp = filepath.replace('/./','/');
  while (newfp != filepath) {
    filepath = newfp;
    newfp = newfp.replace('/./','/');
  }
  const arr = newfp.split('/');
  let idxToSplice = [];
  for (let x=0; x < arr.length; x++) {
    if (arr[x] === '..') {
      idxToSplice.push(x-1);
      idxToSplice.push(x);
    }
  }
  let filtered = arr.filter((x,i) => !idxToSplice.includes(i));
  return filtered.join('/');
}