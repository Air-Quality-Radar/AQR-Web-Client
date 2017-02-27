import { Point } from './point';
import { Sample } from './sample';

export interface InterpolationService {
    addSample(sample: Sample): void;
    resetSamples(): void;
    valueAtLocation(location: Point): number;
}
