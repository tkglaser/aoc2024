import run from "aocrunner";

import { parse } from "./parser.js";
import { memoise } from "../utils/memoise.js";

const sum = (items: number[]) => items.reduce((prev, curr) => prev + curr, 0);

const transform = (input: number): number[] => {
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

const blinkTimes = memoise((stone: number, blinks: number): number => {
  if (blinks === 0) {
    return 1;
  }

  const remainingBlinks = (item: number) => blinkTimes(item, blinks - 1);
  return sum(transform(stone).map(remainingBlinks));
});

const part1 = (rawInput: string) => {
  const input = parse(rawInput);
  const blink = (item: number) => blinkTimes(item, 25);

  return sum(input.map(blink));
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);
  const blink = (item: number) => blinkTimes(item, 75);

  return sum(input.map(blink));
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
