import run from "aocrunner";

import { parse as pegParse } from "./parser.js";
import { Coord } from "../utils/coord.js";
import { Grid } from "../utils/grid.js";

type Robot = { p: Coord; v: Coord };

const parse = (input: string) =>
  pegParse(input).map((robot) => ({
    p: Coord.from(...robot.p),
    v: Coord.from(...robot.v),
  }));

const moveRobotForGrid = (gridX: number, gridY: number) => (robot: Robot) => {
  let newPos = robot.p.add(robot.v);
  if (newPos.coords[0] < 0) {
    newPos = newPos.add(Coord.from(gridX, 0));
  }
  if (newPos.coords[0] >= gridX) {
    newPos = newPos.add(Coord.from(-gridX, 0));
  }
  if (newPos.coords[1] < 0) {
    newPos = newPos.add(Coord.from(0, gridY));
  }
  if (newPos.coords[1] >= gridY) {
    newPos = newPos.add(Coord.from(0, -gridY));
  }
  return { p: newPos, v: robot.v };
};

const scoreGrid = (gridX: number, gridY: number) => (robots: Robot[]) => {
  let q1 = 0;
  let q2 = 0;
  let q3 = 0;
  let q4 = 0;

  const xhalf = Math.floor(gridX / 2);
  const yhalf = Math.floor(gridY / 2);

  for (const robot of robots) {
    if (robot.p.coords[0] < xhalf) {
      if (robot.p.coords[1] < yhalf) {
        ++q1;
      } else if (robot.p.coords[1] > yhalf) {
        ++q2;
      }
    } else if (robot.p.coords[0] > xhalf) {
      if (robot.p.coords[1] < yhalf) {
        ++q3;
      } else if (robot.p.coords[1] > yhalf) {
        ++q4;
      }
    }
  }
  return q1 * q2 * q3 * q4;
};

const isEggy = (robots: Robot[]) => {
  const grid = Grid.empty<boolean>();
  for (const robot of robots) {
    grid.setTile(robot.p, true);
  }

  // can I find a long line?
  const lineLength = 15;
  for (let l = 0; l < grid.lines; ++l) {
    let runningLength = 0;
    for (let c = 0; c < grid.chars; ++c) {
      if (grid.tile(Coord.from(l, c))) {
        ++runningLength;
        if (runningLength >= lineLength) {
          return true;
        }
      } else {
        runningLength = 0;
      }
    }
  }
  return false;
};

const part1 = (rawInput: string) => {
  let input = parse(rawInput);

  // const dim = [11, 7];
  const dim = [101, 103];

  const move = moveRobotForGrid(dim[0], dim[1]);
  const score = scoreGrid(dim[0], dim[1]);

  for (let i = 0; i < 100; ++i) {
    // console.log(input[10].p);
    input = input.map(move);
  }

  return score(input);
};

const part2 = (rawInput: string) => {
  let input = parse(rawInput);
  const dim = [101, 103];

  const move = moveRobotForGrid(dim[0], dim[1]);

  for (let i = 0; i < 10000; ++i) {
    input = input.map(move);
    if (isEggy(input)) {
      return i+1;
    }
  }

  return;
};

run({
  part1: {
    tests: [
      {
        input: `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`,
        expected: 12,
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
