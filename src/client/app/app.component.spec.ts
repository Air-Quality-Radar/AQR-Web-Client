import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SearchComponent } from './left/search/search.component';
import { InfoTableComponent } from './right/info-table/info-table.component';
import { MapComponent } from './left/map/map.component';
import { GoogleMapsAPIConfig } from './left/map/map-config';

export function main() {

  describe('App component', () => {

    let config: Route[] = [
      { path: '', component: HomeComponent }
    ];
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes(config), AgmCoreModule.forRoot({
          apiKey: GoogleMapsAPIConfig.apiKey
        })],
        declarations: [TestComponent, NavbarComponent, AppComponent, HomeComponent, SearchComponent, InfoTableComponent, MapComponent],
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



