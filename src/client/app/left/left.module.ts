import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { SearchComponent } from './search/search.component';
import { MapComponent } from './map/map.component';
import { GoogleMapsAPIConfig } from './map/map-config';
import { OverlayComponent } from './overlay/overlay.component';

@NgModule({
  imports: [CommonModule, RouterModule, AgmCoreModule.forRoot({ apiKey: GoogleMapsAPIConfig.apiKey, libraries: ['places'] })],
  declarations: [SearchComponent, MapComponent, OverlayComponent],
  exports: [SearchComponent, MapComponent, OverlayComponent, CommonModule, RouterModule]
})
export class LeftModule { }
