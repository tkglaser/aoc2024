import { loadParser } from "../utils/index.js";

export type ParsedCoord = { x: number; y: number };

export type ParsingOutput = {
  a: ParsedCoord;
  b: ParsedCoord;
  prize: ParsedCoord;
}[];

export const parse = loadParser<ParsingOutput>(
  import.meta.url,
  "./parser.pegjs",
);
