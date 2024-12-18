import { IHashable } from "../ihashable.js";
import { Edge } from "./edge.js";
import { IGraph } from "./igraph.js";

export class GraphAdapter implements IGraph {
  constructor(private neigboursFn: (from: IHashable) => Edge[]) {}

  neigbours(from: IHashable): Edge[] {
    return this.neigboursFn(from);
  }

  private readonly markMap: Record<string, Record<string, unknown>> = {};

  mark<M>(label: string, vertex: IHashable, value: M): void {
    if (!this.markMap[label]) {
      this.markMap[label] = {};
    }
    this.markMap[label][vertex.hash] = value;
  }

  unMark(label: string, vertex: IHashable): void {
    if (!this.markMap[label]) {
      this.markMap[label] = {};
    }
    delete this.markMap[label][vertex.hash];
  }

  getMark<M>(label: string, vertex: IHashable): M | undefined {
    return this.markMap[label]?.[vertex.hash] as M;
  }

  getAllMarked(label: string, value: unknown): string[] {
    return Object.entries(this.markMap[label] ?? {})
      .filter(([, v]) => v === value)
      .map(([k]) => k);
  }

  clearAllMarks(label: string): void {
    delete this.markMap[label];
  }
}
