import run from "aocrunner";

import { parse } from "./parser.js";
import { memoise } from "../utils/memoise.js";

const transform = (input: number) => {
  if (input === 0) {
    return [1];
  }

  const inputStr = input.toString();
  if (inputStr.length % 2 === 0) {
    const front = inputStr.slice(0, inputStr.length / 2);
    const back = inputStr.slice(inputStr.length / 2);
    return [+front, +back];
  }

  return [input * 2024];
};

const blinkTimes = memoise((input: number, blinks: number): number => {
  if (blinks === 1) {
    return transform(input).length;
  }

  const steps = transform(input);

  return steps
    .map((item) => blinkTimes(item, blinks - 1))
    .reduce((prev, curr) => prev + curr, 0);
});

const part1 = (rawInput: string) => {
  const input = parse(rawInput);
  const blink = (item: number) => blinkTimes(item, 25);

  return input.map(blink).reduce((prev, curr) => prev + curr, 0);
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);
  const blink = (item: number) => blinkTimes(item, 75);

  return input.map(blink).reduce((prev, curr) => prev + curr, 0);
};

run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
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
