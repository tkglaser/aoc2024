import { IHashable } from "../ihashable";

export interface Edge {
    from: IHashable;
    to: IHashable;
    value: number;
  }
  