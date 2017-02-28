import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';

import { InfoTableComponent } from './info-table/info-table.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, PaginationModule, TabsModule, ChartsModule, Ng2TableModule],
  declarations: [InfoTableComponent, ChartComponent],
  exports: [InfoTableComponent, ChartComponent]
})
export class RightModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RightModule,
      providers: []
    };
  }
}
