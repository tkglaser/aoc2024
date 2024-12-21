import run from "aocrunner";
import { Coord } from "../utils/coord.js";

const parse = (input: string) => input.split("\n");

const enum Buttons {
  Activate = "A",
  Up = "^",
  Down = "v",
  Right = ">",
  Left = "<",
  Danger = "X",
}

type Pad = Record<string, Coord>;

// +---+---+---+
// | 7 | 8 | 9 |
// +---+---+---+
// | 4 | 5 | 6 |
// +---+---+---+
// | 1 | 2 | 3 |
// +---+---+---+
//     | 0 | A |
//     +---+---+
const numPad: Pad = {
  [Buttons.Danger]: Coord.from(3, 0),
  "0": Coord.from(3, 1),
  [Buttons.Activate]: Coord.from(3, 2),
  "1": Coord.from(2, 0),
  "2": Coord.from(2, 1),
  "3": Coord.from(2, 2),
  "4": Coord.from(1, 0),
  "5": Coord.from(1, 1),
  "6": Coord.from(1, 2),
  "7": Coord.from(0, 0),
  "8": Coord.from(0, 1),
  "9": Coord.from(0, 2),
};

//     +---+---+
//     | ^ | A |
// +---+---+---+
// | < | v | > |
// +---+---+---+
const directionPad: Pad = {
  [Buttons.Danger]: Coord.from(0, 0),
  [Buttons.Up]: Coord.from(0, 1),
  [Buttons.Activate]: Coord.from(0, 2),
  [Buttons.Left]: Coord.from(1, 0),
  [Buttons.Down]: Coord.from(1, 1),
  [Buttons.Right]: Coord.from(1, 2),
};

const translate = (pad: Pad) => (code: string) => {
  let curr: string = Buttons.Activate;
  const seq: string[] = [];
  for (const button of code) {
    const currPos = pad[curr];
    const destPos = pad[button];
    seq.push(sequence(currPos, destPos, pad[Buttons.Danger]).join(""));
    curr = button;
  }
  return seq.join("");
};

const sequence = (from: Coord, to: Coord, danger: Coord) => {
  const left: Buttons[] = [];
  const right: Buttons[] = [];
  const up: Buttons[] = [];
  const down: Buttons[] = [];
  const diff = to.subtract(from);

  if (diff.char < 0) {
    for (let i = 0; i > diff.char; --i) {
      left.push(Buttons.Left);
    }
  }
  if (diff.line < 0) {
    for (let i = 0; i > diff.line; --i) {
      up.push(Buttons.Up);
    }
  }
  if (diff.line > 0) {
    for (let i = 0; i < diff.line; ++i) {
      down.push(Buttons.Down);
    }
  }
  if (diff.char > 0) {
    for (let i = 0; i < diff.char; ++i) {
      right.push(Buttons.Right);
    }
  }

  // danger checks
  if (Coord.from(from.line, from.char + diff.char).eq(danger)) {
    return [...up, ...down, ...left, ...right, Buttons.Activate];
  }

  if (Coord.from(from.line + diff.line, from.char).eq(danger)) {
    return [...left, ...right, ...up, ...down, Buttons.Activate];
  }

  return [...left, ...up, ...down, ...right, Buttons.Activate];
};

const cleanCode = (code: string) => +code.replace("A", "");

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  return input
    .map((code) => ({ code, seq: translate(numPad)(code) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => cleanCode(item.code) * item.seq.length)
    .reduce((prev, curr) => prev + curr, 0);
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  return input
    .map((code) => ({ code, seq: translate(numPad)(code) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => ({ ...item, seq: translate(directionPad)(item.seq) }))
    .map((item) => cleanCode(item.code) * item.seq.length)
    .reduce((prev, curr) => prev + curr, 0);
};

run({
  part1: {
    tests: [
      {
        input: `029A
980A
179A
456A
379A`,
        expected: 126384,
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
