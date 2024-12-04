import run from "aocrunner";

import { CondOutput, MulOutput, parse, ParsingOutput } from "./parser.js";

const isMul = (item: ParsingOutput): item is MulOutput =>
  typeof (item as MulOutput).a === "number";

const part1 = (rawInput: string) => {
  const input = parse(rawInput, { partialMatch: true });

  return input
    .filter(isMul)
    .map((item) => item.a * item.b)
    .reduce((p, c) => p + c, 0);
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  let sum = 0;
  let doMul = true;

  input.forEach((item) => {
    if (isMul(item) && doMul) {
      sum += item.a * item.b;
    } else {
      doMul = (item as CondOutput).do;
    }
  });

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
