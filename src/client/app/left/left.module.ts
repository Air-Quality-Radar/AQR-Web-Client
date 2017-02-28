import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { SearchComponent } from './search/search.component';
import { MapComponent } from './map/map.component';
import { GoogleMapsAPIConfig } from './map/map-config';
import { OverlayComponent } from './overlay/overlay.component';
import { SliderComponent } from './slider/slider.component';
import { OverlayedMapComponent } from './overlayed-map/overlayed-map.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule,
  RouterModule, AgmCoreModule.forRoot({ apiKey: GoogleMapsAPIConfig.apiKey, libraries: ['places'] })],
  declarations: [SliderComponent, SearchComponent, MapComponent, OverlayComponent, OverlayedMapComponent],
  exports: [SliderComponent, SearchComponent, MapComponent, OverlayedMapComponent, OverlayComponent, CommonModule, RouterModule]
})
export class LeftModule { }
