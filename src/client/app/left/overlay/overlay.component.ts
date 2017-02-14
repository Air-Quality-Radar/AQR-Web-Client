import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Point } from '../interpolation/point';
import { InterpolationService, Sample } from '../interpolation/interpolation.service';
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
    @ViewChild('mapCanvas') private canvasRef : ElementRef;
    private canvas: HTMLCanvasElement;

    private interpolator: InterpolationService;

    private interpolationColor = [255, 0, 0, 100];

    public constructor() {
        this.interpolator = new IdwInterpolationService();

        // Add sample data
        let sample = new Sample(new Point(0.1, 0.5), 1);
        let sample2 = new Sample(new Point(0.9, 0.5), 0.5);
        this.interpolator.addSample(sample);
        this.interpolator.addSample(sample2);
    }

    public ngAfterViewInit(): void {
        this.canvas = <HTMLCanvasElement>this.canvasRef.nativeElement;
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

            let interpolationLocation = new Point(x / imageData.width, y / imageData.height);

            let value = this.interpolator.valueAtLocation(interpolationLocation);

            // Set the RGBA values
            imageData.data[i] = value * this.interpolationColor[0];
            imageData.data[i+1] = value * this.interpolationColor[1];
            imageData.data[i+2] = value * this.interpolationColor[2];
            imageData.data[i+3] = value * this.interpolationColor[3];
        }
    }
}
