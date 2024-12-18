import run from "aocrunner";

import { Grid } from "../utils/grid.js";
import { Coord } from "../utils/coord.js";
import { Edge } from "../utils/graph/edge.js";
import { GraphAdapter } from "../utils/graph/graph-adapter.js";
import { dijkstra } from "../utils/algorithms/dijkstra.js";
import { IHashable } from "../utils/ihashable.js";

class Reindeer implements IHashable {
  constructor(public pos: Coord, public direction: Coord) {
    Object.freeze(this);
  }

  static fromHash(hash: string) {
    const [p, d] = hash.split("@");
    return new Reindeer(Coord.fromHash(p), Coord.fromHash(d));
  }

  get hash() {
    return `${this.pos.hash}@${this.direction.hash}`;
  }

  move() {
    return new Reindeer(this.pos.add(this.direction), this.direction);
  }

  turnLeft() {
    const d = Coord.from(-this.direction.coords[1], this.direction.coords[0]);
    return new Reindeer(this.pos, d);
  }

  turnRight() {
    const d = Coord.from(this.direction.coords[1], -this.direction.coords[0]);
    return new Reindeer(this.pos, d);
  }
}

const reindeerGraph = (grid: Grid) =>
  new GraphAdapter((fromHashable) => {
    const result: Edge[] = [];
    const from = fromHashable as Reindeer;
    const along = from.move();
    if (grid.isInBounds(along.pos) && grid.tile(along.pos) !== "#") {
      result.push({ from, to: along, value: 1 });
    }
    result.push(
      { from, to: from.turnLeft(), value: 1000 },
      { from, to: from.turnRight(), value: 1000 },
    );
    return result;
  });

const part1 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false });

  const startPos = input.find((v) => v === "S")[0].coord;
  const destPos = input.find((v) => v === "E")[0].coord;

  const start = new Reindeer(startPos, Coord.from(0, 1));

  const graph = reindeerGraph(input);

  const search = dijkstra(graph, start, (node) =>
    (node as Reindeer).pos.eq(destPos),
  );

  return search?.dist;
};

const part2 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false });

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
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
