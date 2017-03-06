import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sd-date-picker',
  templateUrl: 'date-picker.component.html',
  styleUrls: ['date-picker.component.css']
})

export class DatePickerComponent {
  @Output() public datePicked = new EventEmitter();
  @Input() public maxDate: string;

  public dateValue: string;

  public constructor() {
    this.maxDate = '2017-03-04';
  }

  public datePickerUpdated(event: Event) {
    let dateInput: HTMLInputElement = <HTMLInputElement>event.target;
    this.datePicked.emit(dateInput.value);
  }
}
