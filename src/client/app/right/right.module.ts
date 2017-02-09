import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts';
import { InfoTableComponent } from './info-table/info-table.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ChartsModule],
  declarations: [InfoTableComponent, ChartComponent],
  exports: [InfoTableComponent, ChartComponent, CommonModule, FormsModule, RouterModule]
})
export class RightModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RightModule,
      providers: []
    };
  }
}

