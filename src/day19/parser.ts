import { loadParser } from "../utils/index.js";

export type ParsingOutput = { available: string[]; designs: string[] };

export const parse = loadParser<ParsingOutput>(
  import.meta.url,
  "./parser.pegjs",
);
