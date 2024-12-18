import run from "aocrunner";

import { Grid } from "../utils/grid.js";
import { Coord } from "../utils/coord.js";
import { Edge } from "../utils/graph/edge.js";
import { dijkstra } from "../utils/algorithms/dijkstra.js";
import { IHashable } from "../utils/ihashable.js";
import { BaseGraph } from "../utils/graph/base-graph.js";

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
    return new Reindeer(this.pos, this.direction.turn90AntiClockwise);
  }

  turnRight() {
    return new Reindeer(this.pos, this.direction.turn90Clockwise);
  }
}

class ReindeerGraph extends BaseGraph<Reindeer> {
  constructor(private grid: Grid) {
    super();
  }

  neigbours(from: Reindeer): Edge<Reindeer>[] {
    const result: Edge<Reindeer>[] = [];
    const along = from.move();
    if (this.grid.isInBounds(along.pos) && this.grid.tile(along.pos) !== "#") {
      result.push({ from, to: along, value: 1 });
    }
    result.push(
      { from, to: from.turnLeft(), value: 1000 },
      { from, to: from.turnRight(), value: 1000 },
    );
    return result;
  }
}

const part1 = (rawInput: string) => {
  const input = Grid.fromText(rawInput, { repeats: false });

  const startPos = input.find((v) => v === "S")!.coord;
  const destPos = input.find((v) => v === "E")!.coord;

  const start = new Reindeer(startPos, Coord.east);

  const graph = new ReindeerGraph(input);

  const search = dijkstra(graph, start, (node) => node.pos.eq(destPos));

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
