import run from "aocrunner";

import { parse, ParsedCoord } from "./parser.js";

type Machine = { a: ParsedCoord; b: ParsedCoord; prize: ParsedCoord };

const solveAlgebraically = (m: Machine) => {
  const a =
    (m.b.x * m.prize.y - m.b.y * m.prize.x) / (m.a.y * m.b.x - m.b.y * m.a.x);

  const b =
    (m.a.x * m.prize.y - m.a.y * m.prize.x) / (m.a.x * m.b.y - m.a.y * m.b.x);

  return { a, b };
};

const isValid = ({ a, b }: { a: number; b: number }) =>
  Number.isInteger(a) && Number.isInteger(b);

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  let tokens = 0;

  for (const machine of input) {
    const solution = solveAlgebraically(machine);
    if (isValid(solution)) {
      tokens += solution.a * 3 + solution.b;
    }
  }

  return tokens;
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput).map((machine) => ({
    ...machine,
    prize: {
      x: machine.prize.x + 10000000000000,
      y: machine.prize.y + 10000000000000,
    },
  }));
  let tokens = 0;

  for (const machine of input) {
    const solution = solveAlgebraically(machine);
    if (isValid(solution)) {
      tokens += solution.a * 3 + solution.b;
    }
  }

  return tokens;
};

run({
  part1: {
    tests: [
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`,
        expected: 480,
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
