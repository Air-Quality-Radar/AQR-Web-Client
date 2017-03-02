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

  private _selectedHour: number = 0;

  @ViewChild('slider') private slider: ElementRef;

  public ngAfterContentInit() {
    let slider = new Slider(this.slider.nativeElement, {});
    slider.on('change', (sliderVal: any) => {
      let newValue: number = sliderVal.newValue;
      if (newValue !== this._selectedHour) {
        this.setSelectedHour(newValue);
        this.valueChanged(sliderVal.newValue);
      }
    });
  }

  public get selectedHour(): number {
    return this._selectedHour;
  }

  private setSelectedHour(newValue: number) {
    this._selectedHour = newValue;
  }

  private valueChanged(newValue: number) {
    this.updateDisplayValue();
    console.log(newValue);
    this.hourChanged.emit(newValue);
  }

  private updateDisplayValue() {
    let displayValue: number = this.selectedHour % 24;
    let displayText = ('0' + displayValue).slice(-2) + ':00';
    document.getElementById('sliderValue').textContent = displayText;
  }
}
