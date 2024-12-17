import run from "aocrunner";

import { Coord, Grid } from "../utils/index.js";

const enum WarehouseItems {
  Empty = ".",
  Box = "O",
  Wall = "#",
  Robot = "@",
}

const parse = (input: string) => {
  const [gridStr, movesStr] = input.split("\n\n");
  const grid = Grid.fromText<WarehouseItems>(gridStr, { repeats: false });

  const moves: Coord[] = [];

  for (const char of movesStr) {
    switch (char) {
      case "^":
        moves.push(Coord.from(-1, 0));
        break;
      case "v":
        moves.push(Coord.from(1, 0));
        break;
      case "<":
        moves.push(Coord.from(0, -1));
        break;
      case ">":
        moves.push(Coord.from(0, 1));
        break;
      default:
        // ignore newlines
        break;
    }
  }

  return { grid, moves };
};

const canMove = (
  grid: Grid<WarehouseItems>,
  robot: Coord,
  direction: Coord,
) => {
  let curr = robot;
  while (true) {
    curr = curr.add(direction);
    if (grid.tile(curr) === WarehouseItems.Empty) {
      return true;
    }
    if (grid.tile(curr) === WarehouseItems.Wall) {
      return false;
    }
  }
};

const move = (grid: Grid<WarehouseItems>, robot: Coord, direction: Coord) => {
  let curr = robot;
  let lastTile = WarehouseItems.Robot;
  grid.setTile(robot, WarehouseItems.Empty);
  while (true) {
    curr = curr.add(direction);
    const tile = grid.tile(curr);
    if (tile === WarehouseItems.Empty) {
      grid.setTile(curr, lastTile);
      break;
    }
    if (tile === WarehouseItems.Box) {
      grid.setTile(curr, lastTile);
      lastTile = tile;
    }
  }
  return robot.add(direction);
};

const score = (grid: Grid<WarehouseItems>) => {
  return grid
    .find((v) => v === WarehouseItems.Box)
    .map((item) => 100 * item.coord.coords[0] + item.coord.coords[1])
    .reduce((prev, curr) => prev + curr, 0);
};

const part1 = (rawInput: string) => {
  const { grid, moves } = parse(rawInput);

  let robot = grid.find((v) => v === WarehouseItems.Robot)[0].coord;

  for (const step of moves) {
    if (canMove(grid, robot, step)) {
      robot = move(grid, robot, step);
    }
    // console.log(grid.toString());
  }

  return score(grid);
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`,
        expected: 10092,
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
