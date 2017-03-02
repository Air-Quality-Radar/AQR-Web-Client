import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { OverlayComponent } from '../overlay/overlay.component';
import { MapComponent } from '../map/map.component';
import { LatLngBounds } from 'angular2-google-maps/core';
import { OverlayDataPoint } from './overlay-data-point';
import { Point } from '../interpolation/point';
import { Sample } from '../interpolation/sample';

/**
 * This class represents the overlayed map component.
 * It's responsible for mapping the air quality data onto the overlay
 */
@Component({
  moduleId: module.id,
  selector: 'sd-overlayed-map',
  templateUrl: 'overlayed-map.component.html',
  styleUrls: ['overlayed-map.component.css']
})
export class OverlayedMapComponent implements AfterContentInit {
  @ViewChild('overlay') private overlay: OverlayComponent;
  @ViewChild('map') private map: MapComponent;

  private _dataPoints: OverlayDataPoint[] = [];

  public ngAfterContentInit(): void {
    this.updateOverlayData();
  }

  public updatePlace(place: any): void {
    this.map.updatePlace(place);
  }

  public handleMapBoundsChange(newBounds: LatLngBounds): void {
    console.log('handling map bounds change');
    this.updateOverlayData();
  }

  public get dataPoints(): OverlayDataPoint[] {
    return this._dataPoints;
  }

  public set dataPoints(dataPoints: OverlayDataPoint[]) {
    this._dataPoints = dataPoints;
    this.updateOverlayData();
  }

  private updateOverlayData(): void {
    if (!this.map.bounds) {
      // Not loaded yet, will load on AfterContentInit event
      return;
    }

    var samples: Sample[] = [];
    for (let dataPoint of this.dataPoints) {
      samples.push(this.sampleForDataPoint(dataPoint));
    }
    this.overlay.updateData(samples);
  }

  private mapWidth(): number {
    let bounds: LatLngBounds = this.map.bounds;
    return Math.abs(bounds.getSouthWest().lng() - bounds.getNorthEast().lng());
  }

  private mapHeight(): number {
    let bounds: LatLngBounds = this.map.bounds;
    return Math.abs(bounds.getNorthEast().lat() - bounds.getSouthWest().lat());
  }

  private sampleForDataPoint(dataPoint: OverlayDataPoint): Sample {
    let bounds: LatLngBounds = this.map.bounds;

    let x: number = (dataPoint.lng - bounds.getSouthWest().lng()) / this.mapWidth();
    let y: number = (dataPoint.lat - bounds.getSouthWest().lat()) / this.mapHeight();

    let location: Point = new Point(x, y);

    return new Sample(location, dataPoint.value);
  }
}
