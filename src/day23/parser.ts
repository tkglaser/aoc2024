import { loadParser } from "../utils/index.js";

export type ParsingOutput = { a: string; b: string }[];

export const parse = loadParser<ParsingOutput>(
  import.meta.url,
  "./parser.pegjs",
);
