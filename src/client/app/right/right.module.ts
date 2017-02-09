import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InfoTableComponent } from './info-table/info-table.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [InfoTableComponent],
  exports: [InfoTableComponent, CommonModule, FormsModule, RouterModule]
})
export class RightModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RightModule,
      providers: []
    };
  }
}

