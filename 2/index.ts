import { readFile } from '../utils/fs';

// Read file per line and get numbers and remove line return
const file = readFile('input.txt');

if (!file) throw new Error('File not found');

const input = file // transform the file input into a table
  .split('\n') // put each line into a value
  .map((values) => values.split(' ')) // separate each value
  .map((values) => values.filter(Boolean)) // remove each empty value
  .map((values) => values.map(Number)); // make each string value a number


const isReportSafe = (array: number[]) => {
  const deltas = array
    .map((_, index) => {
      if (index === 0) return undefined;
      return array[index] - array[index - 1];
    })
    .filter((n) => n !== undefined);

  const deltasAllLtEq3 = deltas.every((delta) => Math.abs(delta) <= 3);
  const deltasAllPositive = deltas.every((delta) => delta > 0);
  const deltasAllNegative = deltas.every((delta) => delta < 0);

  return deltasAllLtEq3 && (deltasAllNegative || deltasAllPositive);
}


// --- Part 1 --- //


const initialSafeReports = [];

for (const report of input) {
  if (isReportSafe(report)) {
    initialSafeReports.push(report);
  }
}

console.log('The initial number of safe reports is: ' + initialSafeReports.length);


// --- Part 2 --- //


const finalSafeReports = [];

for (const report of input) {
  // report is already safe
  if (isReportSafe(report)) {
    finalSafeReports.push(report);
    continue;
  }

  for (const index in report) {
    let copiedReport = JSON.parse(JSON.stringify(report));
    copiedReport.splice(Number(index), 1);

    if (isReportSafe(copiedReport)) {
      finalSafeReports.push(report);
      break; // this breaks from the nested for loop only
    }
  }
}

console.log('The final number of safe reports is: ' + finalSafeReports.length);
