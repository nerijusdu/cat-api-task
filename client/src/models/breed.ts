import { Entity } from "./entity";

export type Breed = Entity & {
  name: string;
  description: string;
  temperament: string;
  weight: {
    imperial: string;
    metric: string;
  };
  origin: string;
  image: {
    url: string;
  }
}