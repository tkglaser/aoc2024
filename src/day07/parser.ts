import { loadParser } from "../utils/index.js";

export type ParsingOutput = { result: number; values: number[] }[];

export const parse = loadParser<ParsingOutput>(
  import.meta.url,
  "./parser.pegjs",
);
