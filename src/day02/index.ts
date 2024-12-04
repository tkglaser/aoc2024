import run from "aocrunner";

import { parse } from "./parser.js";

const isSafe = (report: number[]): boolean => {
  const profile = [];
  for (let i = 1; i < report.length; ++i) {
    profile.push(report[i - 1] - report[i]);
  }
  if (profile[0] > 0) {
    return Math.max(...profile) <= 3 && Math.min(...profile) >= 1;
  } else {
    return Math.max(...profile) <= -1 && Math.min(...profile) >= -3;
  }
};

const variate = (report: number[]): number[][] => {
  const variants = [];
  for (let i = 0; i < report.length; ++i) {
    const copy = [...report];
    copy.splice(i, 1);
    variants.push(copy);
  }
  return variants;
};

const isSafe2 = (report: number[]): boolean => {
  if (isSafe(report)) {
    return true;
  }

  return variate(report).some(isSafe);
};

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  return input.filter(isSafe).length;
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  return input.filter(isSafe2).length;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
