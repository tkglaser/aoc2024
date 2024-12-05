import run from "aocrunner";

import { parse } from "./parser.js";

const isValidForRule = (rule: { a: number; b: number }, update: number[]) => {
  const aIdx = update.findIndex((item) => item === rule.a);
  const bIdx = update.findIndex((item) => item === rule.b);
  if (aIdx === -1 || bIdx === -1) {
    return true;
  }
  return aIdx < bIdx;
};

const isValidForRules = (rules: { a: number; b: number }[], update: number[]) =>
  !rules.some((rule) => !isValidForRule(rule, update));

const sortByRules = (rules: { a: number; b: number }[], update: number[]) =>
  [...update].sort((a, b) => {
    if (rules.find((rule) => rule.a === a && rule.b === b)) {
      return -1;
    }
    if (rules.find((rule) => rule.b === a && rule.a === b)) {
      return 1;
    }
    return 0;
  });

const middleItem = (update: number[]) => update[Math.floor(update.length / 2)];

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  const isValid = (update: number[]) => isValidForRules(input.rules, update);

  return input.updates
    .filter(isValid)
    .map(middleItem)
    .reduce((prev, curr) => prev + curr, 0);
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  const isInValid = (update: number[]) => !isValidForRules(input.rules, update);
  const sort = (update: number[]) => sortByRules(input.rules, update);

  return input.updates
    .filter(isInValid)
    .map(sort)
    .map(middleItem)
    .reduce((prev, curr) => prev + curr, 0);
};

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
