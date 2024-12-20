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

  // ----------- 2D Helpers --------------
  get line() {
    return this.coords[0];
  }

  get char() {
    return this.coords[1];
  }

  static get north() {
    return Coord.from(-1, 0);
  }

  static get east() {
    return Coord.from(0, 1);
  }

  static get south() {
    return Coord.from(1, 0);
  }

  static get west() {
    return Coord.from(0, -1);
  }

  get turn90Clockwise() {
    return Coord.from(this.coords[1], -this.coords[0]);
  }

  get turn90AntiClockwise() {
    return Coord.from(-this.coords[1], this.coords[0]);
  }

  // --------------------------------------

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

  manhattan(c: Coord) {
    return this.zip(this.coords, c.coords, (a, b) => Math.abs(a - b)).reduce(
      (prev, curr) => prev + curr,
      0,
    );
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
