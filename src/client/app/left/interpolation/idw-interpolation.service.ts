import { Point } from './point';
import { Sample } from './sample';
import { InterpolationService } from './interpolation.service';

export class IdwInterpolationService implements InterpolationService {
  private samples: Sample[] = [];

  public addSample(sample: Sample): void {
    this.samples.push(sample);
  }

  public resetSamples(): void {
    this.samples = [];
  }

  public weightOfSampleAtPoint(point: Point, samplePoint: Point): number {
    let distance = point.distanceTo(samplePoint);
    if (distance === 0) {
      throw RangeError();
    }

    return 1 / distance;
  }

  public valueAtLocation(location: Point): number {
    if (this.samples.length === 0) {
      return 0;
    }

    var value = 0;
    var sumOfWeights = 0;

    for (let sample of this.samples) {
      if (location.equals(sample.location)) {
        return sample.value;
      }

      let weight = this.weightOfSampleAtPoint(location, sample.location);
      value += sample.value * weight;
      sumOfWeights += weight;
    }

    return value / sumOfWeights;
  }
}
