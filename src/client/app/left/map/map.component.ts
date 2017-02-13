import { Component, OnInit } from '@angular/core';
import { DataSourceLocation } from './data-source';

/**
 * This class represents the map component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})

export class MapComponent implements OnInit {
    lat: number = 52.2053449;
    lng: number = 0.1218367;
    zoom: number = 13;

    canvas: HTMLCanvasElement;

    dataSourceLocations: DataSourceLocation[] = [
        { lat: 52.202370, lng: 0.124456, name: 'Regent Street / Roadside' },
        { lat: 52.199575, lng: 0.127740, name: 'Gonville Place' },
        { lat: 52.213930, lng: 0.138083, name: 'Montague Road' },
        { lat: 52.208430, lng: 0.141521, name: 'Newmarket Road' },
        { lat: 52.204133, lng: 0.127483, name: 'Parker Street' },
        { lat: 52.194334, lng: 0.135041, name: 'Station Road' }
    ];

    public ngOnInit(): void {
        this.canvas = <HTMLCanvasElement>document.getElementById('map-overlay');
        this.drawRandomColors();
    }

    private drawRandomColors(): void {
        let context = this.canvas.getContext('2d');
        let imageData = context.createImageData(this.canvas.width, this.canvas.height);

        let data = imageData.data; // http://www.onaluf.org/en/entry/13

        for (var i = 0; i < data.length; i += 4) {
            data[i] = Math.random()*255; // red
            data[i+1] = Math.random()*255; // green
            data[i+2] = Math.random()*255; // blue
            data[i+3] = 100;
        }

        imageData.data = data;
        context.putImageData(imageData, 0, 0);
    }
}


