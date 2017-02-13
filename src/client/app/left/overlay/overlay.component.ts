import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

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
    @ViewChild('mapCanvas') canvasRef : ElementRef;
    canvas: HTMLCanvasElement;

    public ngAfterViewInit(): void {
        this.canvas = <HTMLCanvasElement>this.canvasRef.nativeElement;
        this.drawRandomColors();
    }

    private drawRandomColors(): void {
        let context = this.canvas.getContext('2d');
        let imageData = context.createImageData(this.canvas.width, this.canvas.height);

        for (var i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = Math.random()*255; // red
            imageData.data[i+1] = Math.random()*255; // green
            imageData.data[i+2] = Math.random()*255; // blue
            imageData.data[i+3] = 100;
        }

        context.putImageData(imageData, 0, 0);
    }
}