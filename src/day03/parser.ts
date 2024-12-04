import { loadParser } from "../utils/index.js";

export type MulOutput = { a: number; b: number };

export type CondOutput = { do: boolean };

export type ParsingOutput = MulOutput | CondOutput;

export const parse = loadParser<ParsingOutput[]>(
  import.meta.url,
  "./parser.pegjs",
);
