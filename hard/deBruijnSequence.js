/**
 * Given a set of characters C and an integer k, a De Bruijn sequence is a cyclic sequence in which every possible
 * k-length string of characters in C occurs exactly once.
 * 
 * For example, suppose C = {0, 1} and k = 3. Then our sequence should contain the substrings 
 * {'000', '001', '010', '011', '100', '101', '110', '111'}, and one possible solution would be 00010111.
 * 
 * Create an algorithm that finds a De Bruijn sequence.
 * 
 * Example 2, C = {0, 1, 2} and k = 2. Then our sequence should contain the substrings 
 * {'01', '02', '12', '10', '20', '21', '00', '11', '22'}, and one possible solution would be 00102022112.
 *
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should create a valid debruijn sequence', () => {
    assert.ok(validateDebruijn(createDebruijn(['0','1'],3)));
  });
  it('should create the correct debruijn sequence', () => {
    assert.strictEqual(createDebruijn(['0','1'],3), '00010111');
  });
});

function createDebruijn(chars, k) {
  // step 1: create a set of all possible k-length strings
  set = createAllStrings(chars, k);
  console.log(set);
  // step 2: create an adjacency list representing the directed graph
  const graph = createAdjacencyList(set);
  console.log(graph);
  // step 3: find an Eulerian path in the graph
  const eulerianPath = findEulerianPath(graph);
  console.log(eulerianPath);
  // step 4: traverse the Eulerian path and return the corresponding string
  let debruijn = '';
  let currentNode = chars[0];
  while (eulerianPath[currentNode].length > 0) {
    debruijn += currentNode;
    currentNode = eulerianPath[currentNode].pop();
  }
  debruijn += currentNode;
  return debruijn;
}

function createAllStrings(chars, k) {
  if (k === 1) {
    return chars;
  } else {
    const combinations = [];
    const subCombinations = createAllStrings(chars, k - 1);
    for (let i = 0; i < chars.length; i++) {
      for (let j = 0; j < subCombinations.length; j++) {
        combinations.push(chars[i] + subCombinations[j]);
      }
    }
    return combinations;
  }
}

// Create an adjacency list representing the directed graph.
// Each node in the graph represents a prefix of a string, and each edge represents a k-length string.
function createAdjacencyList(chars) {
  const graph = {};
  chars.forEach(c => {
    graph[c] = [];
    chars.forEach(d => {
      graph[c].push(c+d);
    });
  });
  return graph;
}

// Helper function to find an Eulerian path in the graph
function findEulerianPath(graph) {
  // Find the node with an odd number of edges
  let startNode = null;
  for (let node in graph) {
    if (graph[node].length % 2 === 1) {
      startNode = node;
      break;
    }
  }
  if (startNode === null) {
    // If there are no nodes with an odd number of edges, then the graph is already an Eulerian path
    return graph;
  } else {
    // If there is a node with an odd number of edges, then we need to add an edge to the graph
    // to make it an Eulerian path
    graph[startNode].push(startNode);
    return graph;
  }
}

function validateDebruijn(chars, k, str) {
  chars.forEach(c => {
    if (!str.includes(c)) {
      return false;
    }
  });
  return true;
}