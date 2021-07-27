/**
 * Given a string of digits, generate all possible valid IP address combinations.

IP addresses must follow the format A.B.C.D, where A, B, C, and D are numbers between 0 and 255. Zero-prefixed numbers, such as 01 and 065, are not allowed, except for 0 itself.

For example, given "2542540123", you should return ['254.25.40.123', '254.254.0.123'].
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
    it('should insert at index', () => {
        assert.strictEqual(insertAtIndex('2542540123',1),'2.542540123');
        assert.strictEqual(insertAtIndex('2542540123',2),'25.42540123');
        assert.strictEqual(insertAtIndex('2542540123',3),'254.2540123');
    });
    it('should validate numbers', () => {
        assert.ok(checkNum('123'));
        assert.ok(!checkNum('023'));
        assert.ok(!checkNum('298'));
        assert.ok(checkNum('53'));
        assert.ok(checkNum('0'));
    });
    it(`should pass the test case 2542540123`, () => {
        assert.deepStrictEqual(generateIPs('2542540123'),['254.25.40.123', '254.254.0.123']);
    });
    it(`should pass the test case 8091264201`, () => {
        assert.deepStrictEqual(generateIPs('8091264201'),[]); // no valid IP addresses for this case
    });
    it(`should pass the test case 1010010101`, () => {
        assert.deepStrictEqual(generateIPs('1010010101'),['10.100.10.101']);
    });
    it(`should pass the test case 2312201119`, () => {
        assert.deepStrictEqual(generateIPs('2312201119'),['23.12.201.119','231.2.201.119','231.220.1.119','231.220.11.19','231.220.111.9']);
    });
});

function insertAtIndex(str, idx) {
    const first = str.slice(0, idx);
    return first.concat('.',str.slice(idx));
}
function checkNum(s) {
    const MAX = 255;
    const n = Number(s);
    return n > MAX || s.length !== String(n).length ? false : true;
}

function generateIPs(digits) {
    let ips = [];
    function recurse(str) {
        // place '.' to create 1,2, or 3-digit number
        // check if number before the '.' is valid
        // once all '.' have been placed, check the last number
        const nums = str.split('.');
        const numPeriods = nums.length - 1;
        if (numPeriods === 3) {
            if (checkNum(nums[3])) {
                ips.push(str);
            }
        } else {
            const start = str.lastIndexOf('.');
            if (start === -1) {
                [1,2,3].forEach((n) => {
                    if (checkNum(str.slice(0,n))) {
                        recurse(insertAtIndex(str,n));
                    }
                });
            } else {
                [2,3,4].forEach((n) => {
                    const test = str.slice(start+1,start+n);
                    if (checkNum(test)) {
                        recurse(insertAtIndex(str,start+n));
                    }
                });
            }
        }
    }
    recurse(digits);
    return ips;
}