import run from "aocrunner";

import { parse } from "./parser.js";
import { memoise } from "../utils/memoise.js";

const isDesignPossible = memoise(
  (design: string, availableTowels: string[]) => {
    const prefixes = [];
    for (const towel of availableTowels) {
      if (design === towel) {
        return true;
      }

      if (design.startsWith(towel)) {
        prefixes.push(towel);
      }
    }
    for (const prefix of prefixes) {
      const remainder = design.slice(prefix.length);
      if (isDesignPossible(remainder, availableTowels)) {
        return true;
      }
    }
    return false;
  },
);

const countDesignPossibilities = memoise(
  (design: string, availableTowels: string[]) => {
    let possibilities = 0;

    for (const towel of availableTowels) {
      if (design === towel) {
        ++possibilities;
      }

      if (design.startsWith(towel)) {
        const remainder = design.slice(towel.length);
        possibilities =
          possibilities + countDesignPossibilities(remainder, availableTowels);
      }
    }
    return possibilities;
  },
);

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  const isPossible = (design: string) =>
    isDesignPossible(design, input.available);

  return input.designs.filter(isPossible).length;
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  const count = (design: string) =>
    countDesignPossibilities(design, input.available);

  return input.designs.map(count).reduce((prev, curr) => prev + curr, 0);
};

run({
  part1: {
    tests: [
      {
        input: `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`,
        expected: 16,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
