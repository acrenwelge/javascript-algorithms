/* Given a pivot x, and a list lst, partition the list into three parts.

The first part contains all elements in lst that are less than x
The second part contains all elements in lst that are equal to x
The third part contains all elements in lst that are larger than x
Ordering within a part can be arbitrary.

For example, given x = 10 and lst = [9, 12, 3, 5, 14, 10, 10], one partition may be [9, 3, 5, 10, 10, 12, 14].
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    let lst = [9,12,3,5,14,10,10];
    let result = partition(lst, 10);
    assert(result[0] < 10 && result[1] < 10 && result[2] < 10);
    assert(result[3] === 10 && result[4] === 10);
    assert(result[5] > 10 && result[6] > 10);
  })
})

function partition(lst, x) {
  // idea: use an insertion sort?
  // insert values < x at beginning, values > x at the end
  for (let i=0; i < lst.length; i++) {
    if (lst[i] < x) {
      let insertMe = lst.splice(i,1);
      lst.unshift(insertMe);
    } else if (lst[i] > x) {
      let insertMe = lst.splice(i,1);
      lst.push(insertMe);
    }
  }
  return lst;
}
