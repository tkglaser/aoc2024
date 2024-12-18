import { IHashable } from "../ihashable.js";
import { Edge } from "./edge.js";
import { IGraph } from "./igraph.js";

export abstract class BaseGraph<
  V extends IHashable,
  E extends Edge<V> = Edge<V>,
> implements IGraph<V, E>
{
  abstract neigbours(from: V): E[];

  private readonly markMap: Record<string, Record<string, unknown>> = {};

  mark<M>(label: string, vertex: V, value: M): void {
    if (!this.markMap[label]) {
      this.markMap[label] = {};
    }
    this.markMap[label][vertex.hash] = value;
  }

  unMark(label: string, vertex: V): void {
    if (!this.markMap[label]) {
      this.markMap[label] = {};
    }
    delete this.markMap[label][vertex.hash];
  }

  getMark<M>(label: string, vertex: V): M | undefined {
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
