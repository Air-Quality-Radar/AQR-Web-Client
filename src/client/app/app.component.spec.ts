import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SearchComponent } from './left/search/search.component';
import { InfoTableComponent } from './right/info-table/info-table.component';
import { ChartComponent } from './right/chart/chart.component';
import { ChartsModule } from 'ng2-charts/';

export function main() {

  describe('App component', () => {

    let config: Route[] = [
      { path: '', component: HomeComponent }
    ];
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes(config)],
        declarations: [ChartsModule, ChartComponent, TestComponent, NavbarComponent, AppComponent, HomeComponent, SearchComponent, InfoTableComponent],
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



