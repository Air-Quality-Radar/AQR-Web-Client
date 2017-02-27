import { Point } from './point';

export class Sample {
  public constructor(public readonly location: Point, public readonly value: number) { }

  public toString(): string {
    return `Sample(location: ${this.location} , value: ${this.value})`;
  }
}
