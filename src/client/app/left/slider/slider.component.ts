import { Component, EventEmitter, Output, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';

declare var Slider: any;

@Component({
  moduleId: module.id,
  selector: 'sd-slider',
  templateUrl: 'slider.component.html',
  styleUrls: ['slider.component.css']
})

export class SliderComponent implements AfterContentInit {
  @Output() public hourChanged = new EventEmitter();

  public sliderTimeString: string;

  private _selectedHour: number;

  @ViewChild('slider') private sliderElement: ElementRef;
  private slider: any;

  public ngAfterContentInit(): void {
    var sliderConfig = {};

    if (window.innerWidth <= 800) {
      sliderConfig = {
        ticks: [0, 6, 12, 18, 24],
        ticks_labels: ['00:00', '06:00', '12:00', '18:00', '00:00']
      };
    }

    this.slider = new Slider(this.sliderElement.nativeElement, sliderConfig);
    this.slider.on('change', (sliderVal: any) => {
      let newValue: number = sliderVal.newValue;
      if (newValue !== this._selectedHour) {
        this._selectedHour = newValue;
        this.valueChanged(sliderVal.newValue);
      }
    });
    this.slider.setValue(this._selectedHour);
    this.valueChanged(this._selectedHour);
  }

  public get selectedHour(): number {
    return this._selectedHour;
  }

  public set selectedHour(newValue: number) {
    if (this.slider) {
      this.slider.setValue(newValue);
      this.valueChanged(newValue);
    }
    this._selectedHour = newValue;
  }

  private valueChanged(newValue: number): void {
    this.updateDisplayValue();
    this.hourChanged.emit(newValue);
  }

  private updateDisplayValue(): void {
    let displayValue: number = this.selectedHour % 24;
    let displayText = ('0' + displayValue).slice(-2) + ':00';
    this.sliderTimeString = displayText;
  }
}
