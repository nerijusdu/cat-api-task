import { Entity } from "./entity";

export type Cat = Entity & {
  name: string;
  breedId: string;
  breedName?: string;
  weight: number;
};
