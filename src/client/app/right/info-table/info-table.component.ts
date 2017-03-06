import { Component } from '@angular/core';
import { NumberMeasurement } from '../../shared/data-point/data-point';

@Component({
  moduleId: module.id,
  selector: 'sd-info-table',
  templateUrl: 'info-table.component.html',
  styleUrls: ['info-table.component.css']
})
export class InfoTableComponent {
  public pm25DisplayValue: string;
  public pm10DisplayValue: string;
  public noxDisplayValue: string;
  public temperatureDisplayValue: string;

  private noDataString = 'No data';

  // this is a single method as it only makes sense to update all the fields
  public updateData(pm25: NumberMeasurement, pm10: NumberMeasurement, nox: NumberMeasurement,
                    temperature: NumberMeasurement, isPrediction: boolean) {
    this.pm25DisplayValue = this.displayValue(pm25, isPrediction);
    this.pm10DisplayValue = this.displayValue(pm10, isPrediction);
    this.noxDisplayValue = this.displayValue(nox, isPrediction);
    this.temperatureDisplayValue = this.displayValue(temperature, isPrediction);
  }

  private displayValue(measurement: NumberMeasurement, isPrediction: boolean): string {
    if (Number.isNaN(measurement.value)) {
      return this.noDataString;
    }

    return measurement.value.toFixed(3) + ' ' + measurement.units + (isPrediction ? ' (predicted)' : '');
  }
}
