import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { OverlayedMapComponent } from '../left/overlayed-map/overlayed-map.component';
import { InfoTableComponent } from '../right/info-table/info-table.component';

import { RadarAPIClient } from '../shared/radar-api-client/radar-api-client.service';
import { DataPoint, NumberMeasurement } from '../shared/data-point/data-point';
import { OverlayDataPoint } from '../left/overlayed-map/overlay-data-point';
import { DateUtils } from '../shared/date-utils/date-utils';
import { DatePickerComponent } from '../left/date-picker/date-picker.component';
import { SliderComponent } from '../left/slider/slider.component';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements AfterContentInit {
  public maxDateAvailable: string = '2017-03-06';

  @ViewChild('overlayedMap') private overlayedMap: OverlayedMapComponent;
  @ViewChild('infoTable') private infoTable: InfoTableComponent;
  @ViewChild('datePicker') private datePicker: DatePickerComponent;
  @ViewChild('slider') private slider: SliderComponent;

  private dataPoints: DataPoint[];
  private visibleDataPoints: DataPoint[];

  private currentDate: string;
  private currentHour: number;

  private dataPointScaleMin: number;
  private dataPointScaleMax: number;

  constructor(private apiClient: RadarAPIClient) {}

  ngAfterContentInit() {
    let now = new Date();

    this.currentHour = now.getHours();
    this.currentDate = DateUtils.DateStringForDate(now);

    this.slider.selectedHour = this.currentHour;
    this.datePicker.dateValue = this.currentDate;
    this.getData();
  }

  public handlePlaceUpdated(place: any) {
    this.overlayedMap.updatePlace(place);
  }

  public handleDatePicked(dateString: string) {
    this.currentDate = dateString;
    this.getData();
    this.updateVisibleData();
  }

  public handleHourChanged(newHour: any) {
    this.currentHour = newHour;
    this.updateVisibleData();
  }

  private getData() {
    this.apiClient.getDataPoints(this.currentDate).subscribe(
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
        let maxDate = new Date(this.maxDateAvailable);
        this.maxDateAvailable = DateUtils.DateStringForDate(new Date(Math.max(maxDate.getTime(), new Date(point.calendar).getTime())));
      }
    }

    this.dataPointScaleMin = minNox;
    this.dataPointScaleMax = maxNox;
  }

  private updateVisibleData() {
    let numMillisecondsInHour = 60 * 60 * 1000;
    let visibleDate: Date = DateUtils.StartOfDayForDate(new Date(this.currentDate));
    visibleDate.setHours(this.currentHour);

    if (this.dataPoints) {
      this.visibleDataPoints = this.dataPoints.filter((point) => point.calendar === visibleDate.getTime());
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

    let isPrediction = this.visibleDataPoints.some((dataPoint: DataPoint) => dataPoint.predicted);

    this.infoTable.updateData(pm25, pm10, nox, temperature, isPrediction);
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
