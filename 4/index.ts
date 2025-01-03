import { readFile } from '../utils/fs';

// Read file per line and get numbers and remove line return
const file = readFile('input.txt');

if (!file) throw new Error('File not found');

const input = file // transform the file input into a table
  .split('\n') // put each line into a value
  .map((values) => values.split('')); // separate each letter

type Directions = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
const directions = new Map<Directions, [number, number]>([
  ['N', [-1, 0]],
  ['NE', [-1, 1]],
  ['E', [0, 1]],
  ['SE', [1, 1]],
  ['S', [1, 0]],
  ['SW', [1, -1]],
  ['W', [0, -1]],
  ['NW', [-1, -1]],
]);

// --- Part 1 --- //


let xmasResult = 0;
const XMAS = ['X', 'M', 'A', 'S'] as const;

const testXmas = (line: number, col: number, lineDirection: number, colDirection: number) => {
  const xmasWord = XMAS.join('');

  let word = input[line]?.[col];
  if (word !== XMAS[0]) return false;

  while (word !== xmasWord) {
    const lineOffset = line + (lineDirection * word.length);
    const colOffset = col + (colDirection * word.length);

    let nextLetter = input[lineOffset]?.[colOffset];
    if (!nextLetter) return false;

    word += nextLetter;

    // if the start of the word being seeked does not correspond, we can stop now
    if (word !== XMAS.slice(0, word.length).join('')) return false;
  }
  return true;
};

for (let line = 0; line < input.length; line += 1) {
  for (let col = 0; col < input[line].length; col += 1) {
    for (const dir of directions.values()) {
      if (testXmas(line, col, dir[0], dir[1])) xmasResult += 1;
    }
  }
}

console.log('The final result of all XMAS appearances is: ' + xmasResult);


// --- Part 2 --- //


let masCrossResult = 0;
const MAS = ['M', 'A', 'S'] as const;
const foundWordsCordinates: Array<{
  start: [number, number],
  end: [number, number],
}> = [];

const testMasCross = (line: number, col: number) => {
  if (input[line]?.[col] !== MAS[1]) return false;

  const letterNE = input[line + directions.get('NE')![0]]?.[col + directions.get('NE')![1]];
  const letterSE = input[line + directions.get('SE')![0]]?.[col + directions.get('SE')![1]];
  const letterSW = input[line + directions.get('SW')![0]]?.[col + directions.get('SW')![1]];
  const letterNW = input[line + directions.get('NW')![0]]?.[col + directions.get('NW')![1]];

  if (
    letterNE !== letterSW &&
    letterNW !== letterSE &&
    [letterNE, letterSE, letterSW, letterNW].every(((letter) => 
      letter === MAS[0] || letter === MAS[MAS.length - 1]
    ))
  ) {
    return true;
  }
};

for (let line = 0; line < input.length; line += 1) {
  for (let col = 0; col < input[line].length; col += 1) {
    if (testMasCross(line, col)) masCrossResult += 1;
  }
}

console.log('The final result of all MAS crosses appearances is: ' + masCrossResult);
