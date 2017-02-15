import { Component, ViewChild } from '@angular/core';
import { MapComponent } from '../left/map/map.component';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent {
  @ViewChild('map') private map: MapComponent;

  public handlePlaceUpdated(place: any) {
    this.map.onPlaceUpdated(place);
  }
}
