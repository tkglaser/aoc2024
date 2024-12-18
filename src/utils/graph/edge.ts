import { IHashable } from "../ihashable";

export interface Edge<V extends IHashable> {
  from: V;
  to: V;
  value: number;
}
