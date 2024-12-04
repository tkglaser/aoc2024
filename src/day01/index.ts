import run from "aocrunner";

import { parse } from "./parser.js";

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  const leftSorted = input.map((r) => r.left).sort();
  const rightSorted = input.map((r) => r.right).sort();

  let dist = 0;

  for (let i = 0; i < leftSorted.length; ++i) {
    dist += Math.abs(leftSorted[i] - rightSorted[i]);
  }

  return dist;
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  const rightFreq: Record<string, number> = {};
  input
    .map((r) => r.right)
    .forEach((item) => {
      if (!rightFreq[item]) {
        rightFreq[item] = 0;
      }
      ++rightFreq[item];
    });

  let score = 0;
  input
    .map((r) => r.left)
    .forEach((item) => {
      score += item * (rightFreq[item] ?? 0);
    });

  return score;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
