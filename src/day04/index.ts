import run from "aocrunner";

import { Coord, Grid } from "../utils/index.js";

const word = "XMAS";

const test1 = (grid: Grid<string>, start: Coord, direction: Coord) => {
  let curr = start;
  for (const letter of word) {
    if (!grid.isInBounds(curr)) {
      return false;
    }
    if (letter !== grid.tile(curr)) {
      return false;
    }
    curr = curr.add(direction);
  }
  return true;
};

const test2 = (grid: Grid<string>, start: Coord) => {
  if (grid.tile(start) !== "A") {
    return false;
  }
  let neig = [
    grid.tile(start.add(Coord.from(-1, -1)), "."),
    grid.tile(start.add(Coord.from(1, 1)), "."),
    grid.tile(start.add(Coord.from(-1, 1)), "."),
    grid.tile(start.add(Coord.from(1, -1)), "."),
  ].join("");

  if (["MSMS", "SMMS", "MSSM", "SMSM"].includes(neig)) {
    return true;
  }

  return false;
};

const part1 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false });
  const directions: Coord[] = [
    Coord.from(-1, 0),
    Coord.from(1, 0),
    Coord.from(0, 1),
    Coord.from(0, -1),
  
    Coord.from(1, 1),
    Coord.from(1, -1),
    Coord.from(-1, 1),
    Coord.from(-1, -1),
  ];
  

  let wordCount = 0;

  for (let l = 0; l < input.lines; ++l) {
    for (let c = 0; c < input.chars; ++c) {
      for (let direction of directions) {
        if (test1(input, Coord.from(l, c), direction)) {
          ++wordCount;
        }
      }
    }
  }

  return wordCount;
};

const part2 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false });

  let wordCount = 0;

  for (let l = 0; l < input.lines; ++l) {
    for (let c = 0; c < input.chars; ++c) {
      if (test2(input, Coord.from(l, c))) {
        ++wordCount;
      }
    }
  }

  return wordCount;
};

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
