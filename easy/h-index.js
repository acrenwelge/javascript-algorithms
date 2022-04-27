/*
In academia, the h-index is a metric used to calculate the impact of a researcher's papers. It is calculated as follows:

A researcher has index h if at least h of her N papers have h citations each. If there are multiple h satisfying this formula, the maximum is chosen.

For example, suppose N = 5, and the respective citations of each paper are [4, 3, 0, 1, 5]. Then the h-index would be 3, since the researcher has 3 papers with at least 3 citations.

Given a list of paper citations of a researcher, calculate their h-index.
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    assert.equal(get_h_index([4,3,0,1,5]),3);
  });
  it('should pass the custom case 1', () => {
    assert.equal(get_h_index([4,2,0,1,5]),2);
  });
  it('should pass the custom case 2', () => {
    assert.equal(get_h_index([5,5,5,5,5]),5);
  });
  it('should pass the custom case 3', () => {
    assert.equal(get_h_index([1,1,1,1,2]),1);
  });
});

function get_h_index(papers) {
    const N = papers.length;
    let h = N;
    let count = 0;
    while (h >= 0) {
        for (const cites of papers) {
            if (cites >= h) count++;
        }
        if (count >= h) return h;
        h--;
        count = 0;
    }
    return h;
}