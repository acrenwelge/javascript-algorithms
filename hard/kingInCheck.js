/**
 * You are presented with an 8 by 8 matrix representing the positions of pieces on a chess board. 
 * The only pieces on the board are the black king and various white pieces. Given this matrix, 
 * determine whether the king is in check.
 * 
 * For example:
 *  ...K....
    ........
    .B......
    ......P.
    .......R
    ..N.....
    ........
    .....Q..
    should return True, since the bishop is attacking the king diagonally.
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should validate the king is in check - default case', () => {
    const board = [['.', '.', '.', 'K', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', 'B', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', 'P', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', 'R'],
                   ['.', '.', 'N', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', 'Q', '.', '.']];
    assert.ok(kingInCheck(board));
  });
  it('should validate the king is NOT in check', () => {
    const board = [['.', '.', '.', 'K', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', 'P', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', 'R'],
                   ['.', '.', 'N', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', 'Q', '.', '.']];
    assert.strictEqual(kingInCheck(board), false);
  });
  it('should validate the king is in check - custom case 1', () => {
    const board = [['.', 'R', '.', 'K', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', 'P', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', 'R'],
                   ['.', '.', 'N', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', 'Q', '.', '.']];
    assert.ok(kingInCheck(board));
  });
  it('should validate the king is in check - custom case 2', () => {
    const board = [['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', 'K', '.', 'P', '.'],
                   ['.', '.', '.', '.', '.', 'P', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', 'Q', '.', '.', '.', '.']];
    assert.ok(kingInCheck(board));
  });
  it('should validate the king is in check - custom case 3', () => {
    const board = [['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', 'Q', 'B', '.', 'K', '.', 'P', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', 'N', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.']];
    assert.ok(kingInCheck(board));
  });
  it('should validate the king is in check - custom case 4', () => {
    const board = [['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', 'N', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', 'K', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', '.'],
                   ['.', '.', '.', '.', '.', '.', '.', 'Q'],
                   ['.', '.', '.', '.', '.', '.', '.', '.']];
    assert.ok(kingInCheck(board));
  });
});

function kingInCheck(board) {
  // find the king
  let kingRow = -1;
  let kingCol = -1;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length;j++) {
      if (board[i][j] === 'K') {
        kingRow = i;
        kingCol = j;
        break;
      }
    }
  }
  // check for queens or rooks in the same row or column
  for (let i = kingRow + 1; i < board.length; i++) { // check rows
    const square = board[i][kingCol];
    if (['P','B','N'].includes(square)) { break; } // blocked, not in check
    if (['Q','R'].includes(square)) { return true; }
  }
  for (let i = kingRow - 1; i >= 0; i--) {
    const square = board[i][kingCol];
    if (['P','B','N'].includes(square)) {break; }
    if (['Q','R'].includes(square)) { return true; }
  }
    // check columns
  for (let i = kingCol + 1; i < board.length; i++) {
    const square = board[kingRow][i];
    if (['P','B','N'].includes(square)) {break; }
    if (['Q','R'].includes(square)) { return true; }
  }
  for (let i = kingCol - 1; i >= 0; i--) {
    const square = board[kingRow][i];
    if (['P','B','N'].includes(square)) {break; }
    if (['Q','R'].includes(square)) { return true; }
  }
  // check for queens or bishops in the diagonals, and pawns in the forward diagonals
  if (board[kingRow + 1][kingCol + 1] === 'P' || board[kingRow + 1][kingCol - 1] === 'P') { return true; }
  for (let i = kingRow + 1, j = kingCol + 1; i < board.length && j < board.length; i++, j++) {
    const square = board[i][j];
    if (['P','N','R'].includes(square)) {break; }
    if (['Q','B'].includes(square)) { return true; }
  }
  for (let i = kingRow + 1, j = kingCol - 1; i < board.length && j >= 0; i++, j--) {
    const square = board[i][j];
    if (['P','N','R'].includes(square)) {break; }
    if (['Q','B'].includes(square)) { return true; }
  }
  for (let i = kingRow - 1, j = kingCol + 1; i >= 0 && j < board.length; i--, j++) {
    const square = board[i][j];
    if (['P','N','R'].includes(square)) {break; }
    if (['Q','B'].includes(square)) { return true; }
  }
  for (let i = kingRow - 1, j = kingCol - 1; i >= 0 && j >= 0; i--, j--) {
    const square = board[i][j];
    if (['P','N','R'].includes(square)) {break; }
    if (['Q','B'].includes(square)) { return true; }
  }
  // check for knights
  if (kingRow + 2 < board.length && kingCol + 1 < board.length && board[kingRow + 2][kingCol + 1] === 'N') { return true; }
  if (kingRow + 2 < board.length && kingCol - 1 >= 0 && board[kingRow + 2][kingCol - 1] === 'N') { return true; }
  if (kingRow - 2 >= 0 && kingCol + 1 < board.length && board[kingRow - 2][kingCol + 1] === 'N') { return true; }
  if (kingRow - 2 >= 0 && kingCol - 1 >= 0 && board[kingRow - 2][kingCol - 1] === 'N') { return true; }
  if (kingRow + 1 < board.length && kingCol + 2 < board.length && board[kingRow + 1][kingCol + 2] === 'N') { return true; }
  if (kingRow + 1 < board.length && kingCol - 2 >= 0 && board[kingRow + 1][kingCol - 2] === 'N') { return true; }
  if (kingRow - 1 >= 0 && kingCol + 2 < board.length && board[kingRow - 1][kingCol + 2] === 'N') { return true; }
  if (kingRow - 1 >= 0 && kingCol - 2 >= 0 && board[kingRow - 1][kingCol - 2] === 'N') { return true; }
  return false;
}