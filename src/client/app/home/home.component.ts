import { Component, ViewChild } from '@angular/core';
import { OverlayedMapComponent } from '../left/overlayed-map/overlayed-map.component';

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
  @ViewChild('overlayedMap') private overlayedMap: OverlayedMapComponent;

  public handlePlaceUpdated(place: any) {
    this.overlayedMap.updatePlace(place);
  }
}
