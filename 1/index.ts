import { readFile } from '../utils/fs';

// Read file per line and get numbers and remove line return
const file = readFile('input.txt');

if (!file) throw new Error('File not found');

const input = file // transform the file input into a table
  .split('\n') // put each line into a value
  .map((values) => values.split(' ')) // separate each value
  .map((values) => values.filter(Boolean)) // remove each empty value
  .map((values) => values.map(Number)); // make each string value a number


// --- Part 1 --- //


let leftList: (typeof input)[number] = [];
let rightList: (typeof input)[number] = [];

for (const tuple of input) {
  leftList.push(tuple[0]);
  rightList.push(tuple[1]);
}

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

const deltas = input.map((_values, index) => Math.abs(rightList[index] - leftList[index]));

let total = 0;
for (const delta of deltas) {
  total += delta;
}

console.log('The total delta is: ' + total);


// --- Part 2 --- //


const appearances: Record<string, number> = {};

for (const value of leftList) {
  appearances[String(value)] = rightList.filter((v) => v === value).length;
}

let similarityScore = 0;
for (const appearance of Object.entries(appearances)) {
  similarityScore += Number(appearance[0]) * appearance[1];
}

console.log('The similarity score is: ' + similarityScore);
