import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SearchComponent } from './left/search/search.component';
import { InfoTableComponent } from './right/info-table/info-table.component';
import { ChartComponent } from './right/chart/chart.component';
import { MapComponent } from './left/map/map.component';
import { GoogleMapsAPIConfig } from './left/map/map-config';
import { OverlayComponent } from './left/overlay/overlay.component';
import { SliderComponent } from './left/slider/slider.component';
import { OverlayedMapComponent } from './left/overlayed-map/overlayed-map.component';
import { DatePickerComponent } from './left/date-picker/date-picker.component';

export function main() {

  describe('App component', () => {

    let config: Route[] = [
      { path: '', component: HomeComponent }
    ];
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule, ChartsModule,
          RouterTestingModule.withRoutes(config), AgmCoreModule.forRoot({
        apiKey: GoogleMapsAPIConfig.apiKey
      })],
        declarations: [SliderComponent, ChartComponent, TestComponent, NavbarComponent, AppComponent,
          HomeComponent, SearchComponent, InfoTableComponent, DatePickerComponent,
          MapComponent, OverlayComponent, OverlayedMapComponent],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' }
        ]
      });
    });

    it('should build without a problem',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let compiled = fixture.nativeElement;

            expect(compiled).toBeTruthy();
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-app></sd-app>'
})

class TestComponent {
}
