import { loadParser } from "../utils/index.js";

export type ParsingOutput = {
  rules: { a: number; b: number }[];
  updates: number[][];
};

export const parse = loadParser<ParsingOutput>(
  import.meta.url,
  "./parser.pegjs",
);
