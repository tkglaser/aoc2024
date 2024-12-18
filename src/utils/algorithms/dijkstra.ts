import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { IGraph } from "../graph/igraph.js";
import { IHashable } from "../ihashable.js";

export function dijkstra(
  graph: IGraph,
  start: IHashable,
  isTarget: (node: IHashable) => boolean,
) {
  graph.mark("distance", start, 0);
  let curr = start;
  const q = new MinPriorityQueue<{ node: IHashable; distance: number }>(
    (v) => v.distance,
  );
  q.enqueue({ node: start, distance: 0 });

  const cleanup = () => {
    graph.clearAllMarks("visited");
  };

  const tracePath = (t: IHashable) => {
    const path: IHashable[] = [];
    let curr = t;

    do {
      path.unshift(curr);
      curr = graph.getMark("origin", curr)!;
    } while (curr !== start);
    return path;
  };

  do {
    curr = q.dequeue()?.node;

    if (!curr) {
      cleanup();
      return;
    }

    const currDist = graph.getMark<number>("distance", curr)!;

    if (isTarget(curr)) {
      cleanup();
      return { p: tracePath(curr), dist: currDist };
    }

    if (graph.getMark("visited", curr)) {
      continue;
    }

    for (const n of graph.neigbours(curr)) {
      let nDist = graph.getMark<number>("distance", n.to);
      if (typeof nDist === "undefined") {
        nDist = Number.MAX_SAFE_INTEGER;
      }

      const newNDist = currDist + n.value;
      const isBetter = newNDist < nDist;
      if (isBetter) {
        graph.mark("distance", n.to, newNDist);
        graph.mark("origin", n.to, curr);
        q.enqueue({ node: n.to, distance: newNDist });
      }
    }
    graph.mark("visited", curr, true);
  } while (true);
}
