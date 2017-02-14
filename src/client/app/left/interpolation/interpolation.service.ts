import { Point } from './point';

export class Sample {
    private _location: Point;
    private _value: number;

    public constructor(location: Point, value: number) {
        this._location = location;
        this._value = value;
    }

    public get location(): Point {
        return this._location;
    }

    public get value(): number {
        return this._value;
    }
}

export interface InterpolationService {
    addSample(sample: Sample): void;
    valueAtLocation(location: Point): number;
}
