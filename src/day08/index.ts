import run from "aocrunner";

import { Coord, Grid } from "../utils/index.js";

type Antenna = { location: Coord; frequency: string };

const findAntennas = (grid: Grid): Antenna[] =>
  grid
    .find((val) => val !== ".")
    .map((item) => ({ location: item.coord, frequency: item.val }));

const countAntiNodes = (grid: Grid) => {
  const antennas = findAntennas(grid);
  for (let i = 0; i < antennas.length; ++i) {
    for (let j = i + 1; j < antennas.length; ++j) {
      if (antennas[i].frequency === antennas[j].frequency) {
        const dist = antennas[j].location.subtract(antennas[i].location);
        [antennas[i].location.subtract(dist), antennas[j].location.add(dist)]
          .filter((c) => grid.isInBounds(c))
          .forEach((c) => grid.mark("antinode", c, true));
      }
    }
  }

  return grid.markedCount("antinode", true);
};

const countAntiNodes2 = (grid: Grid) => {
  const antennas = findAntennas(grid);
  for (let i = 0; i < antennas.length; ++i) {
    for (let j = i + 1; j < antennas.length; ++j) {
      if (antennas[i].frequency === antennas[j].frequency) {
        const dist = antennas[j].location.subtract(antennas[i].location);
        
        let curr = antennas[i].location;
        while (grid.isInBounds(curr)) {
          curr = curr.subtract(dist);
        }
        curr = curr.add(dist);
        while (grid.isInBounds(curr)) {
          grid.mark("antinode", curr, true);
          curr = curr.add(dist);
        }
      }
    }
  }

  return grid.markedCount("antinode", true);
};

const part1 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false });

  return countAntiNodes(input);
};

const part2 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false });

  return countAntiNodes2(input);
};

run({
  part1: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
