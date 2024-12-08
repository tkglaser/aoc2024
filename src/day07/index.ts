import run from "aocrunner";

import { parse } from "./parser.js";
import { memoise } from "../utils/index.js";

const possibleResults = memoise((values: number[]): number[] => {
  if (values.length === 1) {
    return values;
  }
  const [last, ...restTemp] = [...values].reverse();
  const rest = restTemp.reverse();

  const result = [
    ...possibleResults(rest).map((item) => item + last),
    ...possibleResults(rest).map((item) => item * last),
  ];
  return result;
});

const isPossible = ({ result, values }: { result: number; values: number[] }) =>
  possibleResults(values).includes(result);

const concat = (a: number, b: number) => +(a.toString() + b.toString());

const possibleResults2 = memoise((values: number[]): number[] => {
  if (values.length === 1) {
    return values;
  }
  const [last, ...restTemp] = [...values].reverse();
  const rest = restTemp.reverse();

  const result = [
    ...possibleResults2(rest).map((item) => item + last),
    ...possibleResults2(rest).map((item) => item * last),
    ...possibleResults2(rest).map((item) => concat(item, last)),
  ];
  return result;
});

const isPossible2 = ({
  result,
  values,
}: {
  result: number;
  values: number[];
}) => possibleResults2(values).includes(result);

const sum = (v: number[]) => v.reduce((prev, curr) => prev + curr, 0);

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  return sum(input.filter(isPossible).map((eq) => eq.result));
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  return sum(input.filter(isPossible2).map((eq) => eq.result));
};

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
