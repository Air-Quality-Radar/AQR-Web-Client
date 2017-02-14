import { IdwInterpolationService } from './idw-interpolation.service';
import { Sample } from './interpolation.service';
import { Point } from './point';

export function main() {
    describe('IDW Interpolation Service', () => {
        it('should return zero value when no samples exist', () => {
            let interpolation = new IdwInterpolationService();

            expect(interpolation.valueAtLocation(new Point(0, 0))).toBe(0);
            expect(interpolation.valueAtLocation(new Point(0.3, 0.7))).toBe(0);
        });

        it('should return constant value when one sample exists', () => {
            let interpolation = new IdwInterpolationService();
            let sampleValue = 0.5;

            let sample = new Sample(new Point(0.1, 0.2), sampleValue);
            interpolation.addSample(sample);

            expect(interpolation.valueAtLocation(new Point(0, 0))).toBe(sampleValue);
            expect(interpolation.valueAtLocation(new Point(0.3, 0.7))).toBe(sampleValue);
        });

        it('should return average of sample values in middle when two samples', () => {
            let interpolation = new IdwInterpolationService();
            let sampleValue1 = 0.2;
            let sampleValue2 = 0.6;

            let sample1 = new Sample(new Point(0, 0), sampleValue1);
            interpolation.addSample(sample1);

            let sample2 = new Sample(new Point(1, 0.5), sampleValue2);
            interpolation.addSample(sample2);

            let sampleValueAverage = (sampleValue1 + sampleValue2) / 2;

            // Use toBeCloseTo as there may be floating point errors
            expect(interpolation.valueAtLocation(new Point(0.5, 0.25))).toBeCloseTo(sampleValueAverage);
        });

        it('should return sample value at sample location', () => {
            let interpolation = new IdwInterpolationService();
            let sampleLocation1 = new Point(0.1, 0.2);
            let sampleValue1 = 0.2;
            let sampleLocation2 = new Point(0.8, 0.7);
            let sampleValue2 = 0.6;

            let sample1 = new Sample(sampleLocation1, sampleValue1);
            interpolation.addSample(sample1);

            let sample2 = new Sample(sampleLocation2, sampleValue2);
            interpolation.addSample(sample2);

            expect(interpolation.valueAtLocation(sampleLocation1)).toBe(sampleValue1);
            expect(interpolation.valueAtLocation(sampleLocation2)).toBe(sampleValue2);
        });
    });
}
