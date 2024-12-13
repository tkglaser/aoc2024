import run from "aocrunner";

import { dfs } from "../utils/algorithms/dfs.js";
import { VisitResult } from "../utils/algorithms/visit-result.js";
import { Coord } from "../utils/coord.js";
import { Grid } from "../utils/grid.js";

const directions = [
  Coord.from(-1, 0),
  Coord.from(1, 0),
  Coord.from(0, -1),
  Coord.from(0, 1),
];

const part1 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false });

  const findTileWithNoRegion = () =>
    input.find((_, c) => !input.getMark<number>("region", c))[0]?.coord;

  const flood = (start: Coord, regionId: number) => {
    const crop = input.tile(start)!;
    input.clearAllMarks("visited");
    dfs(
      start,
      (curr) => {
        const n = directions
          .map((d) => d.add(curr))
          .filter((t) => input.isInBounds(t))
          .filter((t) => input.tile(t) === crop)
          .filter((t) => !input.hasMark("region", t))
          .filter((t) => !input.getMark("visited", t));
        return n;
      },

      (tile) => {
        input.mark("region", tile, regionId);
        input.mark("visited", tile, true);
        return VisitResult.Continue;
      },
    );
  };

  const scoreRegion = (regionId: number) => {
    const region = input.getAllMarked("region", regionId);
    let area = 0;
    let perimeter = 0;
    for (const coord of region) {
      ++area;
      perimeter +=
        4 -
        directions
          .map((dir) => coord.add(dir))
          .filter((t) => input.isInBounds(t))
          .filter((t) => input.getMark("region", t) === regionId).length;
    }
    return area * perimeter;
  };

  let regionId = 1;

  while (true) {
    const start = findTileWithNoRegion();
    if (!start) {
      break;
    }
    flood(start, regionId);
    ++regionId;
  }

  regionId = 1;

  let total = 0;

  while (true) {
    const score = scoreRegion(regionId++);
    if (score) {
      total += score;
    } else {
      break;
    }
  }

  return total;
};

const part2 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false });

  const findTileWithNoRegion = () =>
    input.find((_, c) => !input.getMark<number>("region", c))[0]?.coord;

  const flood = (start: Coord, regionId: number) => {
    const crop = input.tile(start)!;
    input.clearAllMarks("visited");
    dfs(
      start,
      (curr) => {
        const n = directions
          .map((d) => d.add(curr))
          .filter((t) => input.isInBounds(t))
          .filter((t) => input.tile(t) === crop)
          .filter((t) => !input.hasMark("region", t))
          .filter((t) => !input.getMark("visited", t));
        return n;
      },

      (tile) => {
        input.mark("region", tile, regionId);
        input.mark("visited", tile, true);
        return VisitResult.Continue;
      },
    );
  };

  const scoreRegion = (regionId: number) => {
    const region = input.getAllMarked("region", regionId);
    let area = 0;
    let perimeter = 0;
    for (const coord of region) {
      ++area;

      const fences = directions
        .map((dir) => coord.add(dir))
        .map(
          (c) =>
            !input.isInBounds(c) || input.getMark("region", c) !== regionId,
        );

      if (fences[0]) {
        if (fences[2]) {
          perimeter += 1;
        }
        if (fences[3]) {
          perimeter += 1;
        }
      }
      if (fences[1]) {
        if (fences[2]) {
          perimeter += 1;
        }
        if (fences[3]) {
          perimeter += 1;
        }
      }
    }
    console.log(area, perimeter);
    return area * perimeter;
  };

  let regionId = 1;

  while (true) {
    const start = findTileWithNoRegion();
    if (!start) {
      break;
    }
    flood(start, regionId);
    ++regionId;
  }

  regionId = 1;

  let total = 0;

  while (true) {
    const score = scoreRegion(regionId++);
    if (score) {
      total += score;
    } else {
      break;
    }
  }

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: 140,
      },
      {
        input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
        expected: 772,
      },
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
        expected: 1930,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: 80,
      },
      {
        input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
        expected: 436,
      },
      {
        input: `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`,
        expected: 236,
      },
      {
        input: `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`,
        expected: 368,
      },
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
        expected: 1206,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
