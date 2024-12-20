import run from "aocrunner";

import { Coord, Grid } from "../utils/index.js";

const enum Mark {
  TrackId = "trackId",
  Visited = "visited",
}

const numberRaceTiles = (grid: Grid) => {
  const start = grid.find((v) => v === "S")!.coord;
  const end = grid.find((v) => v === "E")!.coord;

  let counter = 0;
  let curr = start;
  grid.mark(Mark.TrackId, start, 0);

  do {
    grid.mark(Mark.Visited, curr, true);
    curr = [
      curr.add(Coord.north),
      curr.add(Coord.east),
      curr.add(Coord.south),
      curr.add(Coord.west),
    ]
      .filter((c) => grid.isInBounds(c))
      .filter((c) => grid.tile(c) !== "#")
      .filter((c) => !grid.getMark(Mark.Visited, c))[0];
    grid.mark(Mark.TrackId, curr, ++counter);
  } while (!curr.eq(end));

  grid.clearAllMarks(Mark.Visited);
};

const aggregateShortcuts = (grid: Grid) => {
  const shortcuts: Record<string, number> = {};

  for (let line = 0; line < grid.lines; ++line) {
    for (let char = 0; char < grid.chars; ++char) {
      const curr = Coord.from(line, char);
      if (grid.hasMark(Mark.TrackId, curr)) {
        [
          curr.add(Coord.north).add(Coord.north),
          curr.add(Coord.east).add(Coord.east),
          curr.add(Coord.south).add(Coord.south),
          curr.add(Coord.west).add(Coord.west),
        ]
          .filter((c) => grid.isInBounds(c))
          .filter((c) => grid.hasMark(Mark.TrackId, c))
          .filter(
            (c) =>
              grid.getMark(Mark.TrackId, c)! >
              grid.getMark(Mark.TrackId, curr)!,
          )
          .forEach((c) => {
            const dist =
              grid.getMark<number>(Mark.TrackId, c)! -
              grid.getMark<number>(Mark.TrackId, curr)! -
              2;
            if (!shortcuts[dist]) {
              shortcuts[dist] = 0;
            }
            ++shortcuts[dist];
          });
      }
    }
  }

  return shortcuts;
};

const getManhattanNeighbours20 = (center: Coord) => {
  const result = [];
  for (let line = center.line - 20; line <= center.line + 20; ++line) {
    for (let char = center.char - 20; char <= center.char + 20; ++char) {
      const curr = Coord.from(line, char);
      if (curr.manhattan(center) <= 20) {
        result.push(curr);
      }
    }
  }
  return result;
};

const aggregateShortcuts2 = (grid: Grid) => {
  const shortcuts: Record<string, number> = {};

  for (let line = 0; line < grid.lines; ++line) {
    for (let char = 0; char < grid.chars; ++char) {
      const curr = Coord.from(line, char);
      if (grid.hasMark(Mark.TrackId, curr)) {
        getManhattanNeighbours20(curr)
          .filter((c) => grid.isInBounds(c))
          .filter((c) => grid.hasMark(Mark.TrackId, c))
          .filter(
            (c) =>
              grid.getMark(Mark.TrackId, c)! >
              grid.getMark(Mark.TrackId, curr)!,
          )
          .forEach((c) => {
            const dist =
              grid.getMark<number>(Mark.TrackId, c)! -
              grid.getMark<number>(Mark.TrackId, curr)! -
              c.manhattan(curr);
            if (!shortcuts[dist]) {
              shortcuts[dist] = 0;
            }
            ++shortcuts[dist];
          });
      }
    }
  }

  return shortcuts;
};

const part1 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false });

  numberRaceTiles(input);

  const shortcutAgg = aggregateShortcuts(input);

  return Object.entries(shortcutAgg)
    .map(([key, value]) => (+key >= 100 ? value : 0))
    .reduce((prev, curr) => prev + curr, 0);
};

const part2 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false });

  numberRaceTiles(input);

  const shortcutAgg = aggregateShortcuts2(input);

  return Object.entries(shortcutAgg)
    .map(([key, value]) => (+key >= 100 ? value : 0))
    .reduce((prev, curr) => prev + curr, 0);
};

run({
  part1: {
    tests: [
      {
        input: `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`,
        expected: 0,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`,
        expected: 0,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
