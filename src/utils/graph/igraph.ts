import { IHashable } from "../ihashable.js";
import { Edge } from "./edge.js";

export interface IGraph<V extends IHashable, E extends Edge<V> = Edge<V>> {
  neigbours(from: V): E[];

  mark<M>(label: string, vertex: V, value: M): void;

  unMark(label: string, vertex: V): void;

  getMark<M>(label: string, vertex: V): M | undefined;

  getAllMarked(label: string, value: unknown): string[];

  clearAllMarks(label: string): void;
}
