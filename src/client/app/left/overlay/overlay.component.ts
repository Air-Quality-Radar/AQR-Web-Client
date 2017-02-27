import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Point } from '../interpolation/point';
import { Sample } from '../interpolation/sample';
import { InterpolationService } from '../interpolation/interpolation.service';
import { IdwInterpolationService } from '../interpolation/idw-interpolation.service';

/**
 * This class represents the map component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-overlay',
  templateUrl: 'overlay.component.html',
  styleUrls: ['overlay.component.css']
})

export class OverlayComponent implements AfterViewInit {
  @ViewChild('mapCanvas') private canvasRef: ElementRef;
  private canvas: HTMLCanvasElement;

  private interpolator: InterpolationService;

  private interpolationColor = [255, 0, 0, 200];

  public constructor() {
    this.interpolator = new IdwInterpolationService();
  }

  public ngAfterViewInit(): void {
    this.canvas = <HTMLCanvasElement>this.canvasRef.nativeElement;
    this.draw();
  }

  public updateData(samples: Sample[]): void {
    this.interpolator.resetSamples();

    for (let sample of samples) {
      this.interpolator.addSample(sample);
    }

    console.log('Samples:' + samples);

    this.draw();
  }

  private draw(): void {
    let context = this.canvas.getContext('2d');
    let imageData = context.createImageData(this.canvas.width, this.canvas.height);

    this.drawOnImageData(imageData);

    context.putImageData(imageData, 0, 0);
  }

  private drawOnImageData(imageData: ImageData) {
    for (var i = 0; i < imageData.data.length; i += 4) {
      let x = (i % (imageData.width * 4)) / 4;
      let y = Math.floor(i / (imageData.width * 4));

      // We compute using 1 - y because the origin of the image is the top-left, but we wish to have
      // the origin of the points at the bottom-left
      let interpolationLocation = new Point(x / imageData.width, 1 - (y / imageData.height));

      let value = this.interpolator.valueAtLocation(interpolationLocation);

      // Set the RGBA values
      imageData.data[i] = value * this.interpolationColor[0];
      imageData.data[i + 1] = value * this.interpolationColor[1];
      imageData.data[i + 2] = value * this.interpolationColor[2];
      imageData.data[i + 3] = value * this.interpolationColor[3];
    }
  }
}
