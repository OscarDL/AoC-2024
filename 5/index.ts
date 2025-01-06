import { readFile } from '../utils/fs';

// Read file per line and get numbers and remove line return
const file = readFile('input.txt', true);

if (!file) throw new Error('File not found');

const input = file.split('\n\n'); // split the inputs in the file

let [order, rules] = input.map((lines) => lines.split('\n'));
const pageOrder = order.map((page) => page.split('|').map(Number));
const printingRules = rules.map((rule) => rule.split(',').map(Number));


// --- Part 1 --- //


let result = 0;

for (const rule of printingRules) {
  let ruleIsValid = true;

  for (const order of pageOrder) {
    if (!order.every((value) => rule.includes(value))) {
      continue;
    }

    const [index1, index2] = order;
    if (rule.indexOf(index1) > rule.indexOf(index2)) {
      ruleIsValid = false;
      break;
    }
  }

  if (ruleIsValid) {
    result += rule[Math.floor(rule.length / 2)];
  }
}

console.log('The result of all correctly-ordered updates is: ' + result);


// --- Part 2 --- //


result = 0;
let incorrectRules: Array<{
  breakingOrders: Array<typeof pageOrder[number]>,
  rule: typeof printingRules[number],
}> = [];

for (const rule of printingRules) {
  let breakingOrders: typeof incorrectRules[number]['breakingOrders'] = [];

  for (const order of pageOrder) {
    if (!order.every((value) => rule.includes(value))) {
      continue;
    }

    const [index1, index2] = order;
    if (rule.indexOf(index1) > rule.indexOf(index2)) {
      breakingOrders.push(order);
    }
  }

  if (breakingOrders.length === 0) continue;

  incorrectRules.push({breakingOrders, rule});
}

for (const incorrectRule of incorrectRules) {
  const {breakingOrders, rule} = JSON.parse(JSON.stringify(incorrectRule)) as typeof incorrectRule;

  rule.sort((a, b) => {
    const breakingOrder = breakingOrders.find((order) => order.includes(a) && order.includes(b));
    if (!breakingOrder) return 0;
    return rule.indexOf(breakingOrder[0]) > rule.indexOf(breakingOrder[1]) ? -1 : 1;
  });

  result += rule[Math.floor(rule.length / 2)];
}

console.log('The result of all initially incorrectly-ordered updates is: ' + result);
