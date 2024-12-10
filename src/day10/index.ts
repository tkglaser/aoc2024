import run from "aocrunner";

import { Grid, Coord } from "../utils/index.js";

const directions = [
  Coord.from(-1, 0),
  Coord.from(1, 0),
  Coord.from(0, -1),
  Coord.from(0, 1),
];

const findTrailHeads = (grid: Grid<number>) =>
  grid.find((val) => val === 0).map((item) => item.coord);

const endsReached = (trailHead: Coord, grid: Grid<number>) => {
  const dfsEnds = (point: Coord): Coord[] => {
    if (grid.tile(point) === 9) {
      return [point];
    }
    return directions
      .map((dir) => point.add(dir))
      .filter((n) => grid.isInBounds(n))
      .filter((n) => grid.tile(n) === grid.tile(point)! + 1)
      .flatMap(dfsEnds);
  };

  return dfsEnds(trailHead);
};

const score1 = (trailHead: Coord, grid: Grid<number>) =>
  [...new Set(endsReached(trailHead, grid).map((c) => c.hash))].length;

const score2 = (trailHead: Coord, grid: Grid<number>) =>
  endsReached(trailHead, grid).length;

const part1 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false }, (tile) => +tile);

  const heads = findTrailHeads(input);

  return heads
    .map((head) => score1(head, input))
    .reduce((prev, curr) => prev + curr, 0);
};

const part2 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false }, (tile) => +tile);

  const heads = findTrailHeads(input);

  return heads
    .map((head) => score2(head, input))
    .reduce((prev, curr) => prev + curr, 0);
};

run({
  part1: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 81,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
