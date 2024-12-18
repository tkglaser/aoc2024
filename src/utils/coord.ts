import { IHashable } from "./ihashable.js";

export class Coord implements IHashable {
  private constructor(readonly coords: number[]) {
    Object.freeze(this);
  }

  static from(...coords: number[]) {
    return new Coord(coords);
  }

  static fromHash(hash: string) {
    const coords = hash.split("#").map(Number);
    return new Coord(coords);
  }

  add(c: Coord) {
    return new Coord(this.zip(this.coords, c.coords, (a, b) => a + b));
  }

  subtract(c: Coord) {
    return this.add(c.not);
  }

  eq(c: Coord) {
    return this.zip(this.coords, c.coords, (a, b) => a === b).every(
      (item) => item === true,
    );
  }

  // convenience method for 2D grids
  get line() {
    return this.coords[0];
  }

  // convenience method for 2D grids
  get char() {
    return this.coords[1];
  }

  get not() {
    return new Coord(this.coords.map((c) => -c));
  }

  get hash() {
    return this.coords.join("#");
  }

  toString() {
    return this.hash;
  }

  private zip<T>(a: number[], b: number[], fn: (a: number, b: number) => T) {
    if (a.length !== b.length) {
      throw new Error("dims must match");
    }
    const result = [];
    for (let i = 0; i < a.length; ++i) {
      result.push(fn(a[i], b[i]));
    }
    return result;
  }
}
