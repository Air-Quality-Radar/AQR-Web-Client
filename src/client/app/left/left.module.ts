import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SearchComponent],
  exports: [SearchComponent,
    CommonModule, FormsModule, RouterModule]
})
export class LeftModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LeftModule,
      providers: [NameListService]
    };
  }
}

