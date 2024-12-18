import { loadParser } from "../utils/index.js";

export type ParsingOutput = { a: number; b: number; c: number; p: number[] };

export const parse = loadParser<ParsingOutput>(
  import.meta.url,
  "./parser.pegjs",
);
