import run from "aocrunner";

import { parse, ParsingOutput } from "./parser.js";

const edgemap = (input: ParsingOutput): Record<string, string[]> => {
  const edgemap: Record<string, string[]> = {};

  for (const edge of input) {
    if (!edgemap[edge.a]) {
      edgemap[edge.a] = [];
    }
    if (!edgemap[edge.b]) {
      edgemap[edge.b] = [];
    }

    edgemap[edge.a].push(edge.b);
    edgemap[edge.b].push(edge.a);
  }
  return edgemap;
};

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  let sets: string[] = [];

  const edges = edgemap(input);

  for (const key of Object.keys(edges)) {
    const neighbours = edges[key];
    for (let i = 0; i < neighbours.length; ++i) {
      for (let j = i + 1; j < neighbours.length; ++j) {
        if (edges[neighbours[i]].includes(neighbours[j])) {
          sets.push([key, neighbours[i], neighbours[j]].sort().join("-"));
        }
      }
    }
  }

  sets = [...new Set(sets)];

  return sets.filter(
    (group) => group[0] === "t" || group[3] === "t" || group[6] === "t",
  ).length;
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  const edges = edgemap(input);
  const clusters: string[][] = [];
  for (let i = 0; i < 3; ++i) {
    for (const node of Object.keys(edges)) {
      for (const cluster of clusters) {
        let connectsAll = true;
        for (const otherNode of cluster) {
          if (!edges[node].includes(otherNode)) {
            connectsAll = false;
          }
        }
        if (connectsAll) {
          cluster.push(node);
        }
      }
      clusters.push([node]);
    }
  }

  let best: string[] = [];
  for (const cluster of clusters) {
    if (cluster.length > best.length) {
      best = cluster;
    }
  }

  return best.sort().join(",");
};

run({
  part1: {
    tests: [
      {
        input: `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`,
        expected: "co,de,ka,ta",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
