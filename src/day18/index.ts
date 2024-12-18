import run from "aocrunner";

import { Grid, Coord } from "../utils/index.js";

const parse = (input: string) =>
  input
    .split("\n")
    .map((row) => Coord.from(...row.split(",").map((item) => +item)));

const shortestPath = (grid: Grid, start: Coord, dest: Coord) => {
  const q: Coord[] = [start];
  grid.clearAllMarks("length");
  grid.clearAllMarks("visited");

  grid.mark("length", start, 0);

  do {
    const node = q.shift()!;
    const length = grid.getMark<number>("length", node);
    if (node.eq(dest)) {
      return length;
    }
    if (!grid.getMark("visited", node)) {
      const neighbours = [
        node.add(Coord.from(-1, 0)),
        node.add(Coord.from(1, 0)),
        node.add(Coord.from(0, -1)),
        node.add(Coord.from(0, 1)),
      ]
        .filter((n) => grid.isInBounds(n))
        .filter((n) => grid.tile(n) !== "#")
        .filter((n) => !grid.getMark("visited", n));

      neighbours.forEach((n) => {
        grid.mark("length", n, length + 1);
      });

      q.push(...neighbours);
      grid.mark("visited", node, true);
    }
  } while (q.length);
  return -1;
};

const part1 = (rawInput: string) => {
  const input = parse(rawInput);
  
  // const dim = 7;
  // const bytes = 12;
  const dim = 71;
  const bytes = 1024;

  const grid = Grid.empty<string>({ lines: dim, chars: dim });

  for (let i = 0; i < bytes; ++i) {
    if (input[i]) {
      grid.setTile(input[i], "#");
    }
  }

  return shortestPath(grid, Coord.from(0, 0), Coord.from(dim - 1, dim - 1));
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  // const dim = 7;
  const dim = 71;

  let index = Math.floor(input.length / 2);
  let area = Math.floor(index / 2);

  do {
    const grid = Grid.empty<string>({ lines: dim, chars: dim });
    for (let i = 0; i < index; ++i) {
      if (input[i]) {
        grid.setTile(input[i], "#");
      }
    }
    if (
      shortestPath(grid, Coord.from(0, 0), Coord.from(dim - 1, dim - 1)) === -1
    ) {
      index -= area;
    } else {
      index += area;
    }
    area = Math.floor(area / 2);
  } while (area > 1);

  console.log(index);

  return input[index].hash.replace("#", ",");
};

run({
  part1: {
    tests: [
      {
        input: `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`,
        expected: 22,
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
