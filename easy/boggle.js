/**
 * Boggle is a game played on a 4 x 4 grid of letters. The goal is to find as many words as possible that can be formed by a sequence of adjacent letters in the grid, using each cell at most once. Given a game board and a dictionary of valid words, implement a Boggle solver.
 */

 var assert = require('assert');
 var path = require('path');

 describe(path.basename(__filename), () => {
    const dict = ['ale','blue','bald','gel','bird','birds','cars','step','steps','pear','sped','dear','drugs'];
    it('should solve a simple game', () => {
        const grid = [
            ['b','l','c','a'],
            ['a','u','h','r'],
            ['l','e','g','s'],
            ['d','r','u','d'],
        ];
        assert.deepStrictEqual(solveBoggle(grid,dict),['ale','bald','blue','cars','drugs','gel']);
    });
    it('should solve another game', () => {
        const grid = [
            ['d','e','p','s'],
            ['p','a','e','t'],
            ['l','r','d','s'],
            ['x','i','b','z'],
        ];
        assert.deepStrictEqual(solveBoggle(grid,dict),['bird','birds','dear','pear','sped','step','steps']);
    });
 });

function solveBoggle(game, dict) {
    function explore(coords, str) {
        const x = coords[coords.length-1][0];
        const y = coords[coords.length-1][1];
        const newStr = str.concat(game[x][y]);
        if (!results.includes(newStr) && dict.includes(newStr)) {
            results.push(newStr);
        }
        let found = coords.find(c => c[0] === x-1 && c[1] === y);
        if (x > 0 && !found) {
            explore(coords.concat([[x-1,y]]), newStr);
        }
        found = coords.find(c => c[0] === x+1 && c[1] === y);
        if (x < 3 && !found) {
            explore(coords.concat([[x+1,y]]), newStr);
        }
        found = coords.find(c => c[0] === x && c[1] === y-1);
        if (y > 0 && !found) {
            explore(coords.concat([[x,y-1]]), newStr);
        }
        found = coords.find(c => c[0] === x && c[1] === y+1);
        if (y < 3 && !found) {
            explore(coords.concat([[x,y+1]]), newStr);
        }
    }
    let results = [];
    for (let i=0; i < game.length; i++) {
        for (let j=0; j < game[i].length; j++) {
            explore([[i,j]],""); // start from each position on the board and explore in all directions
        }
    }
    return results.sort();
}