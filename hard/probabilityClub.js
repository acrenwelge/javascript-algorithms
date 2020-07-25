/*
Alice wants to join her school's Probability Student Club. Membership dues are computed via one of two simple probabilistic games.

The first game: roll a die repeatedly. Stop rolling once you get a five followed by a six. Your number of rolls is the amount you pay, in dollars.

The second game: same, except that the stopping condition is a five followed by a five.

Which of the two games should Alice elect to play? Does it even matter? Write a program to simulate the two games and calculate their expected value.

*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');
logger.setLevel('ALL');

describe(path.basename(__filename), () => {
  it('should pass sanity checks', () => {
    const ITER_SIZE = 10000;
    let result = getExpectedValues(ITER_SIZE);
    logger.info(`Game 1 Expected rolls: ${result.game1}`);
    logger.info(`Game 2 Expected rolls: ${result.game2}`);
    assert.ok(result.game1 > 1);
    assert.ok(result.game2 > 1);
  })
});

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function getExpectedValues(numIter) {
  // calculate expected value for game 1 using 100 iterations
  let arrOfNumRolls = [];
  for (let i=0; i < numIter; i++){
    let numRolls = 1;
    let prevRoll = rollDice();
    let currentRoll = null;
    while (true) {
      currentRoll = rollDice();
      numRolls++;
      if (prevRoll === 5 && currentRoll === 6) {
        break;
      }
      prevRoll = currentRoll;
    }
    arrOfNumRolls.push(numRolls); // record the number of rolls it took to win
  }
  let sum = 0;
  for (let roll of arrOfNumRolls) {
    sum += roll;
  }
  let g1EV = sum / arrOfNumRolls.length;

  // same for game 2
  arrOfNumRolls = [];
  sum = 0;
  for (let i=0; i < numIter; i++){
    let numRolls = 1;
    prevRoll = rollDice();
    currentRoll = null;
    while (true) {
      currentRoll = rollDice();
      numRolls++;
      if (prevRoll === 5 && currentRoll === 5) {
        break;
      }
      prevRoll = currentRoll;
    }
    arrOfNumRolls.push(numRolls);
  }
  for (let roll of arrOfNumRolls) {
    sum += roll;
  }
  let g2EV = sum / arrOfNumRolls.length;
  return {
    game1: g1EV,
    game2: g2EV
  }
}
