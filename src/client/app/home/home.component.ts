import { Component, ViewChild, OnInit } from '@angular/core';
import { OverlayedMapComponent } from '../left/overlayed-map/overlayed-map.component';
import { RadarAPIClient } from '../shared/radar-api-client/radar-api-client.service';
import { DataPoint } from '../shared/data-point/data-point';
import { OverlayDataPoint } from '../left/overlayed-map/overlay-data-point';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('overlayedMap') private overlayedMap: OverlayedMapComponent;

  private dataPoints: DataPoint[];
  private visibleDataPoints: DataPoint[];

  private currentCalendar: number;

  private dataPointScaleMin: number;
  private dataPointScaleMax: number;

  constructor(private apiClient: RadarAPIClient) {}

  ngOnInit() {
    this.currentCalendar = 1488279600000;
    this.subscribeToAPIClient();
  }

  public handlePlaceUpdated(place: any) {
    this.overlayedMap.updatePlace(place);
  }

  public handleHourChanged(newHour: any) {
    let baseCalendar = 1488153600000;
    let numMillisecondsInHour = 60*60*1000;

    this.currentCalendar = baseCalendar + numMillisecondsInHour * newHour;
    this.updateVisibleData();
  }

  private subscribeToAPIClient() {
    this.apiClient.getDataPoints().subscribe(
      dataPoints => {
        this.dataPoints = dataPoints;
        this.updateDataScale();
        this.updateVisibleData();
      },
      error => console.error(error)
    );
  }

  private updateDataScale(): void {
    let maxNox: number = -Infinity;
    let minNox: number = Infinity;

    // find max and min
    for (let point of this.dataPoints) {
      if (point.air.nox !== null) {
        let nox = point.air.nox.value;
        maxNox = Math.max(maxNox, nox);
        minNox = Math.min(minNox, nox);
      }
    }

    this.dataPointScaleMin = minNox;
    this.dataPointScaleMax = maxNox;
  }

  private updateVisibleData() {
    if (this.dataPoints) {
      this.visibleDataPoints = this.dataPoints.filter((point) => point.calendar === this.currentCalendar);
      this.updateOverlay();
    }
  }

  private updateOverlay() {
    let overlayPoints: OverlayDataPoint[] = [];

    for (let point of this.visibleDataPoints) {
      if (point.air.nox !== null) {
        let nox = point.air.nox.value;
        overlayPoints.push(new OverlayDataPoint(
          point.location.latitude,
          point.location.longitude,
          (nox - this.dataPointScaleMin) / (this.dataPointScaleMax - this.dataPointScaleMin))
        );
      }
    }

    this.overlayedMap.dataPoints = overlayPoints;
  }
}
