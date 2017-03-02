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
  public updateData(pm25: NumberMeasurement, pm10: NumberMeasurement, nox: NumberMeasurement, temperature: NumberMeasurement) {
    this.pm25DisplayValue = this.displayValue(pm25);
    this.pm10DisplayValue = this.displayValue(pm10);
    this.noxDisplayValue = this.displayValue(nox);
    this.temperatureDisplayValue = this.displayValue(temperature);
  }

  private displayValue(measurement: NumberMeasurement): string {
    return (Number.isNaN(measurement.value)) ? this.noDataString : measurement.value.toString() + ' ' + measurement.units;
  }
}
