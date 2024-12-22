import run from "aocrunner";

const parse = (input: string) => input.split("\n").map((item) => +item);

// normal js xor overflows
const safeXor = (a: number, b: number) => {
  const cutOff = 1024 * 1024;
  return (
    (Math.floor(a / cutOff) ^ Math.floor(b / cutOff)) * cutOff +
    (a % cutOff ^ b % cutOff)
  );
};

const next = (n: number) => {
  let result = n;
  const mixAndPrune = (a: number) => safeXor(a, result) % 16777216;

  result = mixAndPrune(result * 64);
  result = mixAndPrune(Math.floor(result / 32));
  result = mixAndPrune(result * 2048);
  return result;
};

const times = (t: number) => (n: number) => {
  let result = n;
  for (let i = 0; i < t; ++i) {
    result = next(result);
  }
  return result;
};

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  console.log(times(2000)(10));

  return input.map(times(2000)).reduce((prev, curr) => prev + curr, 0);
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

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
