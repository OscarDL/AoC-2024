import { readFile } from '../utils/fs';

// Read file per line and get numbers and remove line return
const file = readFile('input.txt');

if (!file) throw new Error('File not found');

const executeMul = (instruction: string) => eval(instruction.replace('mul', 'Math.imul'));


// --- Part 1 --- //


type Instruction = {
  type: 'do' | 'dont' | 'mul';
  instructionToEvaluate: string;
};
const instructions: Array<[number, Instruction]> = [];

let result = 0;
let mulInstruction;
const regex = /mul\([0-9]+,[0-9]+\)/g;

while (mulInstruction = regex.exec(file)) {
  const instruction = mulInstruction?.[0];

  // keep a record of the index of all matches
  instructions.push([mulInstruction.index, {
    type: 'mul',
    instructionToEvaluate: instruction,
  }]);

  result += executeMul(instruction);
}

console.log('The initial result of all mul instructions added up is: ' + result);


// --- Part 2 --- //


// reset part 1 result
result = 0;

let doInstruction;
const doRegex = /do\(\)/g;

while (doInstruction = doRegex.exec(file)) {
  const instruction = doInstruction?.[0];

  // keep a record of the index of all matches
  instructions.push([doInstruction.index, {
    type: 'do',
    instructionToEvaluate: instruction,
  }]);
}

let dontInstruction;
const dontRegex = /don\'t\(\)/g;

while (dontInstruction = dontRegex.exec(file)) {
  const instruction = dontInstruction?.[0];

  // keep a record of the index of all matches
  instructions.push([dontInstruction.index, {
    type: 'dont',
    instructionToEvaluate: instruction,
  }]);
}

instructions.sort((a, b) => a[0] - b[0]);

let mulEnabled = true;
for (const instruction of instructions.map((i) => i[1])) {
  switch (instruction.type) {
    case 'do':
      mulEnabled = true;
      break;

    case 'dont':
      mulEnabled = false;
      break;

    default:
      if (mulEnabled) result += executeMul(instruction.instructionToEvaluate);
  }
}

console.log('The final result of all sorted mul instructions added up is: ' + result);
