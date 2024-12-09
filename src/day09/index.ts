import run from "aocrunner";

const emptyBlock = -1;
const isEmpty = (b: number) => b === -1;

const parse = (input: string) => {
  const result: number[] = [];
  let file = true;
  let fileId = 0;
  for (const c of input) {
    const num = +c;
    if (file) {
      for (let i = 0; i < num; ++i) {
        result.push(fileId);
      }
      ++fileId;
    } else {
      for (let i = 0; i < num; ++i) {
        result.push(emptyBlock);
      }
    }
    file = !file;
  }
  return result;
};

const packPart1 = (blocks: number[]) => {
  let left = 0;
  let right = blocks.length - 1;
  const moveToNextFree = () => {
    while (!isEmpty(blocks[left])) {
      ++left;
    }
  };

  const moveToNextBlock = () => {
    while (isEmpty(blocks[right])) {
      --right;
    }
  };

  const swap = () => {
    const t = blocks[left];
    blocks[left] = blocks[right];
    blocks[right] = t;
  };

  while (true) {
    moveToNextFree();
    moveToNextBlock();
    if (left < right) {
      swap();
    } else {
      break;
    }
  }
};

const packPart2 = (blocks: number[]) => {
  const findSlotOfSize = (size: number) => {
    let currentLength = 0;
    let currentStartidx = -1;
    for (let i = 0; i < blocks.length; ++i) {
      if (blocks[i] === -1) {
        if (currentStartidx === -1) {
          currentStartidx = i;
        }
        ++currentLength;
        if (currentLength >= size) {
          return currentStartidx;
        }
      } else {
        currentLength = 0;
        currentStartidx = -1;
      }
    }
    return -1;
  };

  const swap = (src: number, dest: number, length: number) => {
    for (let i = 0; i < length; ++i) {
      const t = blocks[src + i];
      blocks[src + i] = blocks[dest + i];
      blocks[dest + i] = t;
    }
  };

  const startOfFile = (fileId: number) => blocks.findIndex((b) => b === fileId);

  const lengthOfFile = (fileId: number) =>
    blocks.filter((b) => b === fileId).length;

  const maxFileId = Math.max(...blocks);

  for (let fileId = maxFileId; fileId >= 0; --fileId) {
    const start = startOfFile(fileId);
    const length = lengthOfFile(fileId);
    const target = findSlotOfSize(length);

    if (target > -1 && target < start) {
      swap(start, target, length);
    }
  }
};

const checksum = (blocks: number[]) => {
  let total = 0;
  for (let i = 0; i < blocks.length; ++i) {
    if (blocks[i] !== -1) {
      total += i * blocks[i];
    }
  }
  return total;
};

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  packPart1(input);

  return checksum(input);
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  packPart2(input);

  return checksum(input);
};

run({
  part1: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 1928,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
