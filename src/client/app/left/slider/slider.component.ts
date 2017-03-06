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

  public ngAfterContentInit() {
    this.slider = new Slider(this.sliderElement.nativeElement, {});
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

  public get selectedHour() {
    return this._selectedHour;
  }

  public set selectedHour(newValue: number) {
    if (this.slider) {
      this.slider.setValue(newValue);
      this.valueChanged(newValue);
    }
    this._selectedHour = newValue;
  }

  private valueChanged(newValue: number) {
    this.updateDisplayValue();
    this.hourChanged.emit(newValue);
  }

  private updateDisplayValue() {
    let displayValue: number = this.selectedHour % 24;
    let displayText = ('0' + displayValue).slice(-2) + ':00';
    this.sliderTimeString = displayText;
  }
}
