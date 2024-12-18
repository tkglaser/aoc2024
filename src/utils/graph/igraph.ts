import { IHashable } from "../ihashable.js";
import { Edge } from "./edge.js";

export interface IGraph {
  neigbours(from: IHashable): Edge[];

  mark<M>(label: string, vertex: IHashable, value: M): void;

  unMark(label: string, vertex: IHashable): void;

  getMark<M>(label: string, vertex: IHashable): M | undefined;

  getAllMarked(label: string, value: unknown): string[];

  clearAllMarks(label: string): void;
}
