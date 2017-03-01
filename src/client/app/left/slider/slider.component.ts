import { Component, EventEmitter, Output, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';

declare var Slider: any;

@Component({
  moduleId: module.id,
  selector: 'sd-slider',
  templateUrl: 'slider.component.html',
  styleUrls: ['slider.component.css']
})

export class SliderComponent implements AfterContentInit {
  @Output() public timeUpdated = new EventEmitter();

  @ViewChild('slider') slider: ElementRef;

  public disabled: boolean = false;
  public sliderVal: number = 0;
  public someRange2: number[] = [10, 10];

  public sliderConfig: any = {
    behaviour: 'drag',
    connect: true,
    margin: 1,
    limit: 5,
    range: {
      min: 0,
      max: 20
    },
    pips: {
      mode: 'steps',
      density: 5
    }
  };

  changeSomeValue(value: number) {
    this.sliderVal = this.sliderVal + value;
  }

  onSliderChange(value: any) {
    console.log(value);
  }

  ngAfterContentInit() {
    let slider = new Slider(this.slider.nativeElement, {});
    slider.on('change', function(sliderVal: any) {
      sliderVal = sliderVal.newValue;
      if(sliderVal === 24)
        sliderVal = 0;
      var sliderValue = ('0' + sliderVal).slice(-2) + ':00';
      document.getElementById('sliderValue').textContent = sliderValue;
    });
    console.log(slider);
  }
}
