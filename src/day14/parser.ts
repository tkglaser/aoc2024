import { loadParser } from "../utils/index.js";

export type ParsingOutput = { p: [number, number]; v: [number, number] }[];

export const parse = loadParser<ParsingOutput>(
  import.meta.url,
  "./parser.pegjs",
);
