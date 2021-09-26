/**
 * Snakes and Ladders is a game played on a 10 x 10 board, the goal of which is get from square 1 to square 100. On each turn players will roll a six-sided die and move forward a number of spaces equal to the result. If they land on a square that represents a snake or ladder, they will be transported ahead or behind, respectively, to a new square.

Find the smallest number of turns it takes to play snakes and ladders.
 */

// For convenience, here are the squares representing snakes and ladders, and their outcomes:
const snakes = {16: 6, 48: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78};
const ladders = {1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100};

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');
logger.setLevel('ALL');

describe(path.basename(__filename), () => {
  it('should find the smallest number of turns to play', () => {
      assert.strictEqual(finalSolution(), 7);
  });
});

function firstAttempt() {
    /** Loop through each possible roll of die (1-6)
     *  + Calculate new position
     *  + Check if you hit a snake or ladder
     *  + Check if you are in an infinite loop of snake taking you backwards
     */
    let totalSteps = [];
    function takeTurn(start, inc, stepArr) {
        const pos = start + inc;
        let now;
        if (snakes[pos]) {
            now = snakes[pos];
        } else if (ladders[pos]) {
            now = ladders[pos];
        } else {
            now = pos;
        }
        if (stepArr.includes(now)) {
            return;
        }
        stepArr.push(now);
        if (now >= 100) {
            logger.info(`array: ${stepArr}`);
            totalSteps.push(stepArr.length);
        } else {
            for (let i=1; i <= 6; i++) {
                takeTurn(now,i,stepArr.slice());
            }
        }
    }
    for (let i=1; i <= 6; i++) {
        takeTurn(0,i,[]);
    }
    totalSteps.sort();
    return totalSteps[0];
}

function secondAttempt(pos, steps) {
    // find minimum steps from pos to 100
    let paths = []; // min # of steps for each possible roll of die
    for (let i=6; i >= 1; i--) {
        let newPos = pos + i;
        if (newPos >= 100) {
            paths.push(1);
            break;
        } else if (snakes[newPos]) {
            newPos = snakes[newPos];
        } else if (ladders[newPos]) {
            newPos = ladders[newPos];
        }
        if (steps.includes(newPos)) { // detect loops on the board
            continue;
        }
        let newSteps = steps.slice();
        newSteps.push(newPos);
        paths.push(alternate(newPos, newSteps));
    }
    logger.info(steps);
    paths.sort();
    return paths[0] + steps.length;
}

function finalSolution() {
    /**
     * looked up on StackOverflow - find all positions
     * reachable from the previous step
     */
    const jumps = {...snakes, ...ladders};
    let canReach = new Set([38,2,3,14,5,6]);
    let steps = 1;
    while(!canReach.has(100)) {
        steps++;
        logger.info(canReach);
        const oldPositions = new Set(canReach);
        for(const pos of oldPositions) {
            for (let die = 1; die <= 6; die++) {
                let newPos = pos + die;
                if (jumps[newPos]) {
                    newPos = jumps[newPos];
                }
                canReach.add(newPos);
            }
        }
    }
    return steps;
}