import run from "aocrunner";

import { Grid } from "../utils/grid.js";
import { Coord } from "../utils/coord.js";

const findCursor = (grid: Grid<string>) =>
  grid.find((val) => val === "^")!.coord;

const traverse = (grid: Grid<string>) => {
  const up = Coord.from(-1, 0);
  const right = Coord.from(0, 1);
  const down = Coord.from(1, 0);
  const left = Coord.from(0, -1);
  const nextDirection = {
    [up.hash]: right,
    [right.hash]: down,
    [down.hash]: left,
    [left.hash]: up,
  };

  let curr = findCursor(grid);
  let direction = up;
  do {
    grid.mark("visited", curr, true);
    let next = curr.add(direction);
    if (grid.tile(next) === "#") {
      direction = nextDirection[direction.hash];
      next = curr.add(direction);
    }
    if (!grid.isInBounds(next)) {
      return;
    }
    curr = next;
  } while (true);
};

const loops = (grid: Grid<string>, start: Coord) => {
  const up = Coord.from(-1, 0);
  const right = Coord.from(0, 1);
  const down = Coord.from(1, 0);
  const left = Coord.from(0, -1);
  const nextDirection = {
    [up.hash]: right,
    [right.hash]: down,
    [down.hash]: left,
    [left.hash]: up,
  };

  let curr = start;
  let direction = up;
  do {
    if (grid.getMark<Coord>("visited", curr)?.eq(direction)) {
      return true;
    }
    grid.mark("visited", curr, direction);
    let next = curr.add(direction);
    if (grid.tile(next) === "#") {
      direction = nextDirection[direction.hash];
      next = curr.add(direction);
    }
    if (grid.tile(next) === "#") {
      direction = nextDirection[direction.hash];
      next = curr.add(direction);
    }
    if (!grid.isInBounds(next)) {
      return false;
    }
    curr = next;
  } while (true);
};

const testObstructions = (grid: Grid<string>) => {
  let loopers = 0;
  const start = findCursor(grid);
  for (let l = 0; l < grid.lines; ++l) {
    console.log(l);
    for (let c = 0; c < grid.chars; ++c) {
      const coord = Coord.from(l, c);
      if (grid.tile(coord) === ".") {
        grid.setTile(coord, "#");
        if (loops(grid, start)) {
          console.log("Obstruction at ", coord);
          loopers++;
        }
        grid.clearAllMarks("visited");
        grid.setTile(coord, ".");
      }
    }
  }
  return loopers;
};

const part1 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false });
  traverse(input);

  return input.markedCount("visited", true);
};

const part2 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false });

  return testObstructions(input);
};

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
