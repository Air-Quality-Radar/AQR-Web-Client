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
  public maxDateAvailable: string = '2017-03-06';

  @ViewChild('overlayedMap') private overlayedMap: OverlayedMapComponent;
  @ViewChild('infoTable') private infoTable: InfoTableComponent;

  private dataPoints: DataPoint[];
  private visibleDataPoints: DataPoint[];

  private startOfDay: number;
  private currentHour: number;

  private dataPointScaleMin: number;
  private dataPointScaleMax: number;

  private _maxDateAvailable: number;

  constructor(private apiClient: RadarAPIClient) {}

  ngOnInit() {
    this.currentHour = 3;
    this.startOfDay = 1488279600000;
    this._maxDateAvailable = 1488279600000;
    this.subscribeToAPIClient();
  }

  public handlePlaceUpdated(place: any) {
    this.overlayedMap.updatePlace(place);
  }

  public handleDatePicked(date: any) {
    this.startOfDay = new Date(date).getTime();
    this.handleHourChanged(this.currentHour);
  }

  public handleHourChanged(newHour: any) {
    this.currentHour = newHour;
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
      if (point.calendar !== null) {
        this._maxDateAvailable = Math.max(this._maxDateAvailable, new Date(point.calendar).getTime());
      }
    }

    let date: Date = new Date(this._maxDateAvailable);
    this.maxDateAvailable = date.getFullYear().toString() + '-' + this._padding(date.getMonth() + 1) + '-' + this._padding(date.getDate());
    this.dataPointScaleMin = minNox;
    this.dataPointScaleMax = maxNox;
  }

  private updateVisibleData() {
    let numMillisecondsInHour = 60 * 60 * 1000;
    let currentCalendar = this.startOfDay + numMillisecondsInHour * this.currentHour;
    if (this.dataPoints) {
      this.visibleDataPoints = this.dataPoints.filter((point) => point.calendar === currentCalendar);
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

  private _padding(n: number) {
    console.log(n);
    if(n < 10)
      return '0' + n.toString();
    else
      return n.toString();
  }
}
