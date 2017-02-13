import { Point } from './point';

export class Sample {
    public location: Point;
    public value: number;
}

export interface InterpolationService {
    addSample(sample: Sample): void;
    valueAtLocation(location: Point): number;
}
