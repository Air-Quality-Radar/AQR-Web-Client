import { Component, ViewChild, OnInit } from '@angular/core';
import { OverlayedMapComponent } from '../left/overlayed-map/overlayed-map.component';
import { InfoTableComponent } from '../right/info-table/info-table.component';

import { RadarAPIClient } from '../shared/radar-api-client/radar-api-client.service';
import { DataPoint, NumberMeasurement } from '../shared/data-point/data-point';
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
  @ViewChild('infoTable') private infoTable: InfoTableComponent;

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
      this.updateInfoTable();
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

  private updateInfoTable() {
    let pm25 = this.getAverage((dataPoint: DataPoint) => dataPoint.air.pm25);
    let pm10 = this.getAverage((dataPoint: DataPoint) => dataPoint.air.pm10);
    let nox = this.getAverage((dataPoint: DataPoint) => dataPoint.air.nox);
    let temperature = this.getAverage((dataPoint: DataPoint) => null);

    this.infoTable.updateData(pm25, pm10, nox, temperature);
  }

  private getAverage(propertyFunc: (dataPoint: DataPoint) => NumberMeasurement): NumberMeasurement {
    let sum = 0;
    let numSamples = 0;
    var units: string;

    for (let point of this.visibleDataPoints) {
      let measurement = propertyFunc(point);
      if (measurement !== null) {
        sum += measurement.value;
        numSamples++;
        units = measurement.units; // assuming measurements all have same units
      }
    }

    return new NumberMeasurement(sum / numSamples, units);
  }

}
