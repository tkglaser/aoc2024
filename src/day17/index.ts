import run from "aocrunner";

import { parse } from "./parser.js";
import { clearCache, ThreeBitComputer } from "./three-bit-computer.js";

const equal = (a: number[], b: number[]) => {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  const computer = new ThreeBitComputer(input);
  computer.runToCompletion();

  return computer.output.join(",");
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  clearCache();
  // const computer = new ThreeBitComputer(input);

  // console.log(computer.renderProgram());

  for (let i = 0; i < 100000000; ++i) {
    const computer = new ThreeBitComputer({
      ...input,
      a: i,
    });
    computer.runToCompletion();
    if (equal(computer.output, input.p)) {
      return i;
    }
  }

  return;
};

run({
  part1: {
    tests: [
      {
        input: `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
        expected: "4,6,3,5,6,3,5,2,1,0",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`,
        expected: 117440,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
